-- Add generated_html column for storing complete site HTML
ALTER TABLE client_sites ADD COLUMN IF NOT EXISTS generated_html TEXT;

-- Add index for faster lookups by slug
CREATE INDEX IF NOT EXISTS idx_client_sites_slug ON client_sites(slug);
