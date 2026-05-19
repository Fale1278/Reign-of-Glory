-- Create Sermons Table
CREATE TABLE sermons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  speaker TEXT NOT NULL,
  date DATE NOT NULL,
  video_url TEXT,
  description TEXT,
  scripture_references TEXT[],
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Events Table
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Event Registrations Table
CREATE TABLE event_registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Ministries Table
CREATE TABLE ministries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  leader TEXT,
  meeting_time TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Prayer Requests Table
CREATE TABLE prayer_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT,
  email TEXT,
  request TEXT NOT NULL,
  is_public BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'pending', -- pending, prayed, answered
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Blog Posts Table
CREATE TABLE blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  author TEXT,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Admin Roles
CREATE TABLE user_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create Policies

-- Sermons (Public Read, Admin Write)
CREATE POLICY "Public can view sermons" ON sermons FOR SELECT USING (true);
CREATE POLICY "Admins can insert sermons" ON sermons FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));
CREATE POLICY "Admins can update sermons" ON sermons FOR UPDATE USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));
CREATE POLICY "Admins can delete sermons" ON sermons FOR DELETE USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));

-- Events (Public Read, Admin Write)
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Admins can insert events" ON events FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));
CREATE POLICY "Admins can update events" ON events FOR UPDATE USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));
CREATE POLICY "Admins can delete events" ON events FOR DELETE USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));

-- Event Registrations (Public Insert, Admin Read/Write)
CREATE POLICY "Public can register for events" ON event_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view registrations" ON event_registrations FOR SELECT USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));

-- Ministries (Public Read, Admin Write)
CREATE POLICY "Public can view ministries" ON ministries FOR SELECT USING (true);
CREATE POLICY "Admins can insert ministries" ON ministries FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));
CREATE POLICY "Admins can update ministries" ON ministries FOR UPDATE USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));
CREATE POLICY "Admins can delete ministries" ON ministries FOR DELETE USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));

-- Prayer Requests (Public Insert, Public Read if is_public, Admin Read All)
CREATE POLICY "Public can insert prayer requests" ON prayer_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view public prayer requests" ON prayer_requests FOR SELECT USING (is_public = true);
CREATE POLICY "Admins can view all prayer requests" ON prayer_requests FOR SELECT USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));
CREATE POLICY "Admins can update prayer requests" ON prayer_requests FOR UPDATE USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));

-- Blog Posts (Public Read, Admin Write)
CREATE POLICY "Public can view blog posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Admins can insert blog posts" ON blog_posts FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));
CREATE POLICY "Admins can update blog posts" ON blog_posts FOR UPDATE USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));
CREATE POLICY "Admins can delete blog posts" ON blog_posts FOR DELETE USING (EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid()));

-- Create Media Items Table
CREATE TABLE media_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'image', 'audio', 'video'
  file_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Comments Table
CREATE TABLE comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  media_id UUID REFERENCES media_items(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies for Media Items
CREATE POLICY "Public can view media items" ON media_items FOR SELECT USING (true);
CREATE POLICY "Public can insert media items" ON media_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can delete media items" ON media_items FOR DELETE USING (true);

-- Policies for Comments
CREATE POLICY "Public can view comments" ON comments FOR SELECT USING (true);
CREATE POLICY "Public can insert comments" ON comments FOR INSERT WITH CHECK (true);
