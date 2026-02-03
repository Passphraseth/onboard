-- Add message column to update_requests (simpler than raw_message)
-- This allows the frontend to use a simpler column name

ALTER TABLE update_requests
  ADD COLUMN IF NOT EXISTS message TEXT;

-- If raw_message has data but message doesn't, copy it over
UPDATE update_requests
SET message = raw_message
WHERE message IS NULL AND raw_message IS NOT NULL;

-- Make raw_message nullable since we now use message
ALTER TABLE update_requests
  ALTER COLUMN raw_message DROP NOT NULL;
