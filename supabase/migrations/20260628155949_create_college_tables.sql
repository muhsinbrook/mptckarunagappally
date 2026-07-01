
/*
# College Website Schema

## Tables Created
1. `news` — News articles and announcements for the college
   - id, title, content, category, image_url, published_at, created_at
2. `gallery` — Gallery images organized by category
   - id, title, description, image_url, category, created_at
3. `activities` — Activity-specific content (IOC, Alumni, Placement, NSS, Sports)
   - id, activity_type, title, description, image_url, date, created_at

## Security
- RLS enabled on all tables
- Public anon + authenticated read/write (single-tenant, no auth)
*/

-- NEWS TABLE
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text,
  category text NOT NULL DEFAULT 'general',
  image_url text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_news" ON news;
CREATE POLICY "anon_select_news" ON news FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_news" ON news;
CREATE POLICY "anon_insert_news" ON news FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_news" ON news;
CREATE POLICY "anon_update_news" ON news FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_news" ON news;
CREATE POLICY "anon_delete_news" ON news FOR DELETE TO anon, authenticated USING (true);

-- GALLERY TABLE
CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_gallery" ON gallery;
CREATE POLICY "anon_select_gallery" ON gallery FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_gallery" ON gallery;
CREATE POLICY "anon_insert_gallery" ON gallery FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_gallery" ON gallery;
CREATE POLICY "anon_update_gallery" ON gallery FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_gallery" ON gallery;
CREATE POLICY "anon_delete_gallery" ON gallery FOR DELETE TO anon, authenticated USING (true);

-- ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_type text NOT NULL CHECK (activity_type IN ('ioc', 'alumni', 'placement', 'nss', 'sports')),
  title text NOT NULL,
  description text,
  image_url text,
  event_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_activities" ON activities;
CREATE POLICY "anon_select_activities" ON activities FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_activities" ON activities;
CREATE POLICY "anon_insert_activities" ON activities FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_activities" ON activities;
CREATE POLICY "anon_update_activities" ON activities FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_activities" ON activities;
CREATE POLICY "anon_delete_activities" ON activities FOR DELETE TO anon, authenticated USING (true);
