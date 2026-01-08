-- Ürün görsellerini kategorilere göre güncelleme script'i
-- Veritabanında çalıştırılacak

-- Klasik Perdeler kategorisindeki ürünler için varsayılan görsel
UPDATE products 
SET "imageUrl" = '/alyansperdegorselleroptimize/Klasik_Kadife_Perde.png'
WHERE "categoryId" IN (
  SELECT id FROM categories WHERE name = 'Klasik Perdeler'
)
AND ("imageUrl" IS NULL OR "imageUrl" = '' OR "imageUrl" NOT LIKE '/alyansperdegorselleroptimize/%');

-- Modern Rollo Stor kategorisindeki ürünler için varsayılan görsel
UPDATE products 
SET "imageUrl" = '/alyansperdegorselleroptimize/Modern_Rollo_Stor.png'
WHERE "categoryId" IN (
  SELECT id FROM categories WHERE name = 'Modern Rollo Stor'
)
AND ("imageUrl" IS NULL OR "imageUrl" = '' OR "imageUrl" NOT LIKE '/alyansperdegorselleroptimize/%');

-- Blackout Perdeler kategorisindeki ürünler için varsayılan görsel
UPDATE products 
SET "imageUrl" = '/alyansperdegorselleroptimize/Blackout_Perde.png'
WHERE "categoryId" IN (
  SELECT id FROM categories WHERE name = 'Blackout Perdeler'
)
AND ("imageUrl" IS NULL OR "imageUrl" = '' OR "imageUrl" NOT LIKE '/alyansperdegorselleroptimize/%');

-- Dekoratif Tüller kategorisindeki ürünler için varsayılan görsel
UPDATE products 
SET "imageUrl" = '/alyansperdegorselleroptimize/Dekoratif_Tül_Perde.png'
WHERE "categoryId" IN (
  SELECT id FROM categories WHERE name = 'Dekoratif Tüller'
)
AND ("imageUrl" IS NULL OR "imageUrl" = '' OR "imageUrl" NOT LIKE '/alyansperdegorselleroptimize/%');

-- Zebra Stor kategorisindeki ürünler için varsayılan görsel
UPDATE products 
SET "imageUrl" = '/alyansperdegorselleroptimize/Zebra_Stor_Perde.png'
WHERE "categoryId" IN (
  SELECT id FROM categories WHERE name = 'Zebra Stor'
)
AND ("imageUrl" IS NULL OR "imageUrl" = '' OR "imageUrl" NOT LIKE '/alyansperdegorselleroptimize/%');

-- Pleatli Perdeler kategorisindeki ürünler için varsayılan görsel
UPDATE products 
SET "imageUrl" = '/alyansperdegorselleroptimize/Pleatli_Perde.png'
WHERE "categoryId" IN (
  SELECT id FROM categories WHERE name = 'Pleatli Perdeler'
)
AND ("imageUrl" IS NULL OR "imageUrl" = '' OR "imageUrl" NOT LIKE '/alyansperdegorselleroptimize/%');

