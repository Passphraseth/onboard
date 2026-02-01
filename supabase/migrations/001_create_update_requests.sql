-- Create update_requests table for tracking customer change requests
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS update_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'general',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries by lead
CREATE INDEX IF NOT EXISTS idx_update_requests_lead_id ON update_requests(lead_id);
CREATE INDEX IF NOT EXISTS idx_update_requests_status ON update_requests(status);
CREATE INDEX IF NOT EXISTS idx_update_requests_created_at ON update_requests(created_at DESC);

-- Enable Row Level Security
ALTER TABLE update_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access
CREATE POLICY "Service role has full access to update_requests"
  ON update_requests
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create chat_messages table for the chat widget
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant', 'admin')),
  message TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_chat_messages_lead_id ON chat_messages(lead_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Enable Row Level Security
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access
CREATE POLICY "Service role has full access to chat_messages"
  ON chat_messages
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Ensure client_sites table has the right structure
-- (This should already exist, but adding for completeness)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name = 'client_sites' AND column_name = 'generated_html') THEN
    ALTER TABLE client_sites ADD COLUMN generated_html TEXT;
  END IF;
END $$;
