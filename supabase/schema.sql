-- ============================================
-- ONBOARD DATABASE SCHEMA
-- ============================================
-- Run this in your Supabase SQL Editor to set up the database
-- https://supabase.com/dashboard/project/_/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- LEADS TABLE
-- ============================================
-- Stores potential customers (before they pay)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  suburb TEXT,
  state TEXT DEFAULT 'VIC',
  phone TEXT,
  email TEXT,
  google_place_id TEXT,
  google_data JSONB,
  metadata JSONB DEFAULT '{}',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'responded', 'converted', 'rejected')),
  source TEXT DEFAULT 'organic' CHECK (source IN ('organic', 'outreach', 'referral', 'enhanced_onboarding')),
  preview_site_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_slug ON leads(slug);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- ============================================
-- CUSTOMERS TABLE
-- ============================================
-- Stores paying customers
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id),
  stripe_customer_id TEXT UNIQUE,
  email TEXT NOT NULL,
  phone TEXT,
  first_name TEXT,
  last_name TEXT,
  business_name TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'growth', 'pro')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled')),
  updates_this_month INT DEFAULT 0,
  billing_cycle_start TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_customers_stripe ON customers(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_status ON customers(status);

-- ============================================
-- CLIENT SITES TABLE
-- ============================================
-- Stores website content and settings
CREATE TABLE IF NOT EXISTS client_sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  slug TEXT UNIQUE NOT NULL,
  custom_domain TEXT,
  domain_verified BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'preview' CHECK (status IN ('preview', 'live', 'paused', 'deleted')),
  template TEXT DEFAULT 'service-v1',
  content JSONB DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_sites_slug ON client_sites(slug);
CREATE INDEX IF NOT EXISTS idx_sites_customer ON client_sites(customer_id);
CREATE INDEX IF NOT EXISTS idx_sites_status ON client_sites(status);

-- Add foreign key reference to leads table
ALTER TABLE leads
ADD CONSTRAINT fk_leads_preview_site
FOREIGN KEY (preview_site_id) REFERENCES client_sites(id);

-- ============================================
-- UPDATE REQUESTS TABLE
-- ============================================
-- Stores client update requests
CREATE TABLE IF NOT EXISTS update_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  site_id UUID NOT NULL REFERENCES client_sites(id),
  channel TEXT NOT NULL CHECK (channel IN ('sms', 'email', 'dashboard')),
  raw_message TEXT NOT NULL,
  parsed_intent JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'preview_sent', 'approved', 'published', 'rejected')),
  preview_url TEXT,
  processed_by TEXT CHECK (processed_by IN ('ai', 'manual')),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_updates_customer ON update_requests(customer_id);
CREATE INDEX IF NOT EXISTS idx_updates_status ON update_requests(status);

-- ============================================
-- SUBSCRIPTIONS TABLE
-- ============================================
-- Tracks Stripe subscription data
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_price_id TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'growth', 'pro')),
  status TEXT NOT NULL CHECK (status IN ('active', 'past_due', 'cancelled', 'paused')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer ON subscriptions(customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- ============================================
-- MESSAGES TABLE
-- ============================================
-- Stores communication history
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id),
  lead_id UUID REFERENCES leads(id),
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  channel TEXT NOT NULL CHECK (channel IN ('sms', 'email')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_messages_customer ON messages(customer_id);
CREATE INDEX IF NOT EXISTS idx_messages_lead ON messages(lead_id);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
-- Automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_sites_updated_at
  BEFORE UPDATE ON client_sites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE update_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- For now, allow service role full access
-- In production, add more granular policies for authenticated users

-- Service role can do everything
CREATE POLICY "Service role has full access to leads"
  ON leads FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to customers"
  ON customers FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to client_sites"
  ON client_sites FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to update_requests"
  ON update_requests FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to subscriptions"
  ON subscriptions FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to messages"
  ON messages FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- CHAT MESSAGES TABLE
-- ============================================
-- Stores pre-purchase chat conversations
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant')),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_chat_messages_lead ON chat_messages(lead_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created ON chat_messages(created_at);

-- Enable RLS
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role has full access to chat_messages"
  ON chat_messages FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================
-- Stores contact form submissions from live sites
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_submissions_lead ON contact_submissions(lead_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_slug ON contact_submissions(slug);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role has full access to contact_submissions"
  ON contact_submissions FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- ADD lead_id TO UPDATE REQUESTS (for pre-purchase)
-- ============================================
-- Allow update requests from leads (not just customers)
ALTER TABLE update_requests
  ALTER COLUMN customer_id DROP NOT NULL,
  ALTER COLUMN site_id DROP NOT NULL;

ALTER TABLE update_requests
  ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'general',
  ALTER COLUMN channel SET DEFAULT 'dashboard',
  ALTER COLUMN channel DROP NOT NULL;

-- Make channel constraint more flexible
ALTER TABLE update_requests DROP CONSTRAINT IF EXISTS update_requests_channel_check;
ALTER TABLE update_requests ADD CONSTRAINT update_requests_channel_check
  CHECK (channel IS NULL OR channel IN ('sms', 'email', 'dashboard', 'chat'));

-- Index for lead-based lookups
CREATE INDEX IF NOT EXISTS idx_updates_lead ON update_requests(lead_id);

-- ============================================
-- ADD lead_id TO CLIENT SITES (for previews)
-- ============================================
ALTER TABLE client_sites
  ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES leads(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_sites_lead ON client_sites(lead_id);

-- ============================================
-- ADD plan TO LEADS (for tracking selected plan)
-- ============================================
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS plan TEXT CHECK (plan IS NULL OR plan IN ('starter', 'growth', 'pro')),
  ADD COLUMN IF NOT EXISTS contact_name TEXT;

-- ============================================
-- DONE! 🎉
-- ============================================
-- Your database is now set up and ready to use.
