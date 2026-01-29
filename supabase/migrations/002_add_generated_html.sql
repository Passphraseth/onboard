-- Add generated_html column to client_sites table
-- This stores the AI-generated HTML for each site

ALTER TABLE client_sites
ADD COLUMN IF NOT EXISTS generated_html TEXT;

-- Add index for faster lookups (though this column is rarely queried)
-- The main queries are by slug which is already indexed

COMMENT ON COLUMN client_sites.generated_html IS 'AI-generated HTML content for the site';
