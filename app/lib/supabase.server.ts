import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL) {
  throw new Error('SUPABASE_URL is required');
}

if (!process.env.SUPABASE_ANON_KEY) {
  throw new Error('SUPABASE_ANON_KEY is required');
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// SQL untuk membuat tabel partners
/*
CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  order_number INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Data untuk diinsert ke tabel partners
INSERT INTO partners (name, filename, image_url, order_number) VALUES
('Mutu Sekolah', 'logo mutu sekolah.png', '/images/partners/logo mutu sekolah.png', 1),
('Media Karya Muamalah', 'Logo Media Karya Muamalah.png', '/images/partners/Logo Media Karya Muamalah.png', 2),
('Kalif', 'logo kalif.png', '/images/partners/logo kalif.png', 3),
('Vooya', 'Logo Vooya.png', '/images/partners/Logo Vooya.png', 4),
('Pagi Pagi', 'Logo Pagi Pagi.png', '/images/partners/Logo Pagi Pagi.png', 5),
('Tangsel', 'LOGO tangsel.png', '/images/partners/LOGO tangsel.png', 6),
('SMAN 15 Jakarta', 'LOGO SMAN 15 JKT.jpg', '/images/partners/LOGO SMAN 15 JKT.jpg', 7),
('Angkasa', 'Angkasa.png', '/images/partners/Angkasa.png', 8),
('BHM', 'Logo BHM.png', '/images/partners/Logo BHM.png', 9),
('Sisva', 'Logo Sisva.png', '/images/partners/Logo Sisva.png', 10),
('Skyconnection', 'Logo Skyconnection.png', '/images/partners/Logo Skyconnection.png', 11),
('Angkasa Rasa', 'Logo Angkasa Rasa.png', '/images/partners/Logo Angkasa Rasa.png', 12),
('Smoke Station', 'Logo Smoke Station.png', '/images/partners/Logo Smoke Station.png', 13),
('Teratur', 'Logo Teratur.png', '/images/partners/Logo Teratur.png', 14),
('Kementrian Perindustrian', 'Logo Kementrian Perindustrian.png', '/images/partners/Logo Kementrian Perindustrian.png', 15),
('SMKN 47', 'LOGO SMKN 47.jpg', '/images/partners/LOGO SMKN 47.jpg', 16),
('BKPM', 'LOGO_BKPM_HD-removebg-preview.png', '/images/partners/LOGO_BKPM_HD-removebg-preview.png', 17),
('Kemendagri', 'Logo Kemendragi.png', '/images/partners/Logo Kemendragi.png', 18),
('SMPN 144 Jakarta', 'Logo SMPN 144 Jakarta.PNG', '/images/partners/Logo SMPN 144 Jakarta.PNG', 19),
('SMKN 25 Jakarta', 'Logo SMKN 25 Jakarta.JPG', '/images/partners/Logo SMKN 25 Jakarta.JPG', 20),
('SMKN 33 Jakarta', 'Logo SMKN 33 Jakarta.PNG', '/images/partners/Logo SMKN 33 Jakarta.PNG', 21),
('SMAN 15 Jakarta', 'SMAN 15 JKT_Logo.jpg', '/images/partners/SMAN 15 JKT_Logo.jpg', 22),
('Persada', 'logo_persada.png', '/images/partners/logo_persada.png', 23),
('Garudafood', 'logo garudafood.png', '/images/partners/logo garudafood.png', 24),
('KAI', 'Logo KAI.png', '/images/partners/Logo KAI.png', 25),
('TDP Indonesia', 'Logo TDP Indonesia.jpg', '/images/partners/Logo TDP Indonesia.jpg', 26),
('Padma', 'Logo Padma.png', '/images/partners/Logo Padma.png', 27),
('MMI', 'MMI LOGO.jpg', '/images/partners/MMI LOGO.jpg', 28);
*/ 