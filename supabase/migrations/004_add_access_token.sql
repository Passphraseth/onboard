-- Add access_token column to leads table for secure dashboard access
-- Run this in your Supabase SQL editor

-- Add access_token column
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS access_token TEXT;

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_leads_access_token ON leads(access_token);

-- Add generated_html column to client_sites if it doesn't exist
ALTER TABLE client_sites
  ADD COLUMN IF NOT EXISTS generated_html TEXT;

-- Update any existing leads to have a token (optional - you can generate tokens as needed)
-- This creates tokens for leads that don't have one
UPDATE leads
SET access_token = encode(gen_random_bytes(32), 'hex')
WHERE access_token IS NULL;
