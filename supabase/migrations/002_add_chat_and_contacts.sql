-- ============================================
-- MIGRATION: Add Chat & Contact Tables
-- ============================================
-- Run this in Supabase SQL Editor
-- https://supabase.com/dashboard/project/_/sql

-- ============================================
-- 1. CHAT MESSAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant')),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_lead ON chat_messages(lead_id);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role has full access to chat_messages"
  ON chat_messages FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- 2. CONTACT SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_lead ON contact_submissions(lead_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_slug ON contact_submissions(slug);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role has full access to contact_submissions"
  ON contact_submissions FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- 3. MODIFY UPDATE_REQUESTS FOR LEADS
-- ============================================
-- Add lead_id column (allows update requests before they're customers)
ALTER TABLE update_requests
  ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES leads(id) ON DELETE CASCADE;

-- Add type column for categorizing requests
ALTER TABLE update_requests
  ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'general';

-- Make customer_id and site_id optional (for lead-based requests)
ALTER TABLE update_requests
  ALTER COLUMN customer_id DROP NOT NULL;

ALTER TABLE update_requests
  ALTER COLUMN site_id DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_updates_lead ON update_requests(lead_id);

-- ============================================
-- 4. ADD lead_id TO CLIENT_SITES
-- ============================================
ALTER TABLE client_sites
  ADD COLUMN IF NOT EXISTS lead_id UUID REFERENCES leads(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_sites_lead ON client_sites(lead_id);

-- ============================================
-- 5. ADD FIELDS TO LEADS
-- ============================================
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS plan TEXT,
  ADD COLUMN IF NOT EXISTS contact_name TEXT;

-- ============================================
-- DONE! ✅
-- ============================================
