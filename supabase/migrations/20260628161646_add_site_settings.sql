
/*
# Create site_settings table for dynamic site configuration

## Tables Created
1. `site_settings` — Single-row table for site-wide settings
   - id, site_name, address, phone, email, facebook_url, youtube_url, instagram_url, hero_slides, about_text, principal_name, principal_message

## Security
- RLS enabled
- Public read, admin write via anon key (single-tenant app)
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name text NOT NULL DEFAULT 'Model Polytechnic College Karunagappally',
  address text NOT NULL DEFAULT 'Karunagappally, Kollam District, Kerala - 690518',
  phone text NOT NULL DEFAULT '+91 847 700 0000',
  email text NOT NULL DEFAULT 'info@mptcollege.ac.in',
  facebook_url text DEFAULT 'https://facebook.com/mptcollege',
  youtube_url text DEFAULT 'https://youtube.com/mptcollege',
  instagram_url text DEFAULT 'https://instagram.com/mptcollege',
  hero_slides jsonb DEFAULT '[
    {"image": "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg", "title": "Model Polytechnic", "subtitle": "College Karunagappally", "tag": "IHRD"},
    {"image": "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg", "title": "Excellence in", "subtitle": "Technical Education", "tag": "Est. 1990"},
    {"image": "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg", "title": "Shaping", "subtitle": "Future Engineers", "tag": "Industry Ready"}
  ]'::jsonb,
  about_text text DEFAULT 'Established under the Institute of Human Resources Development (IHRD), Model Polytechnic College Karunagappally has been a beacon of technical education since 1990. We offer Diploma programs in six engineering disciplines.',
  principal_name text DEFAULT 'Mrs. Asha R',
  principal_message text DEFAULT 'Welcome to Model Polytechnic College Karunagappally. We are committed to providing an exceptional educational experience that goes beyond textbooks.',
  updated_at timestamptz DEFAULT now()
);

-- Insert default settings row
INSERT INTO site_settings (id) VALUES (gen_random_uuid()) ON CONFLICT (id) DO NOTHING;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_settings" ON site_settings;
CREATE POLICY "anon_select_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_update_settings" ON site_settings;
CREATE POLICY "anon_update_settings" ON site_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
