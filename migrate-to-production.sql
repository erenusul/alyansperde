-- Production Database'e Veri Aktarım Script'i
-- Railway PostgreSQL Query'de çalıştır

-- 1. Kategorileri ekle
INSERT INTO categories (id, name, description, "createdAt", "updatedAt")
VALUES 
  (1, 'Klasik Perdeler', 'Geleneksel tasarım ve kaliteli kumaşlarla üretilen klasik perdeler', NOW(), NOW()),
  (3, 'Modern Rollo Stor', 'Pratik kullanım ve modern tasarımın buluştuğu rollo stor çözümleri', NOW(), NOW()),
  (4, 'Blackout Perdeler', 'Maksimum ışık kontrolü sağlayan blackout perdeler', NOW(), NOW()),
  (5, 'Dekoratif Tüller', 'Şık ve hafif tül perdeler ile zarif dekorasyon', NOW(), NOW()),
  (6, 'Zebra Stor', 'Alternatif şeritli tasarımı ile öne çıkan zebra stor perdeler', NOW(), NOW()),
  (7, 'Pleatli Perdeler', 'Düzenli kıvrımları ile şık görünüm sunan pleatli perdeler', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Kullanıcıları ekle (şifreler bcrypt hash'li - local'den alındı)
-- erenusul@gmail.com için şifre: (local'deki hash)
-- user@example.com için şifre: (local'deki hash)
INSERT INTO users (id, email, password, name, role, "createdAt", "updatedAt")
VALUES 
  (1, 'erenusul@gmail.com', '$2b$10$v1xuUyGW.7CbbqfdBgG40.0eDFrpbf4VruIVypGGQdi8EUCsF4mj6', 'Eren Usul', 'ADMIN', NOW(), NOW()),
  (2, 'user@example.com', '$2b$10$guzfSsFgfsSy8bTC6fCZqedt8SdMSOjWM1Irc4vWAXnhbMIGe5Pj6', 'Test User', 'USER', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 3. Ürünleri ekle
INSERT INTO products (id, name, description, price, "imageUrl", "categoryId", "createdAt", "updatedAt")
VALUES 
  (1, 'Klasik Kadife Perde', 'Lüks kadife kumaştan üretilen, geleneksel tasarımlı klasik perde', 225.00, '/alyansperdegorselleroptimize/Klasik_Kadife_Perde.png', 1, NOW(), NOW()),
  (2, 'Klasik Pamuklu Perde', 'Doğal pamuk kumaştan üretilen, nefes alabilir klasik perde', 150.00, '/alyansperdegorselleroptimize/Klasik_Pamuklu_Perde.png', 1, NOW(), NOW()),
  (3, 'Modern Rollo Stor', 'Pratik kullanım ve modern tasarımın buluştuğu rollo stor', 115.00, '/alyansperdegorselleroptimize/Modern_Rollo_Stor.png', 3, NOW(), NOW()),
  (4, 'Motorlu Rollo Stor', 'Uzaktan kumandalı, otomatik açılıp kapanan motorlu rollo stor', 300.00, '/alyansperdegorselleroptimize/Modern_Rollo_Stor.png', 3, NOW(), NOW()),
  (5, 'Blackout Perde', 'Maksimum ışık kontrolü sağlayan, tamamen karanlık ortam yaratan perde', 185.00, '/alyansperdegorselleroptimize/Blackout_Perde.png', 4, NOW(), NOW()),
  (6, 'Blackout Rollo', 'Pratik kullanımlı, maksimum ışık kontrolü sağlayan blackout rollo', 150.00, '/alyansperdegorselleroptimize/Blackout_Rollo_Perde.png', 4, NOW(), NOW()),
  (7, 'Dekoratif Tül', 'Şık ve hafif tül perde ile zarif dekorasyon', 85.00, '/alyansperdegorselleroptimize/Dekoratif_Tül_Perde.png', 5, NOW(), NOW()),
  (8, 'İşlemeli Tül', 'Özel işlemeli desenli, dekoratif tül perde', 115.00, '/alyansperdegorselleroptimize/Dekoratif_Tül_Perde.png', 5, NOW(), NOW()),
  (9, 'Zebra Stor', 'Alternatif şeritli tasarımı ile öne çıkan zebra stor perde', 135.00, '/alyansperdegorselleroptimize/Zebra_Stor_Perde.png', 6, NOW(), NOW()),
  (10, 'Zebra Blackout', 'Zebra desenli, ışık blokajı sağlayan özel stor', 170.00, '/alyansperdegorselleroptimize/Zebra_Blackout_Perde.png', 6, NOW(), NOW()),
  (11, 'Pleatli Perde', 'Düzenli kıvrımları ile şık görünüm sunan pleatli perde', 165.00, '/alyansperdegorselleroptimize/Pleatli_Perde.png', 7, NOW(), NOW()),
  (12, 'Pleatli Stor', 'Pleatli tasarımlı, modern stor perde çözümü', 145.00, '/alyansperdegorselleroptimize/Pleatli_Perde.png', 7, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

