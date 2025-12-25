#!/bin/bash

# Token al
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"erenusul@gmail.com","password":"test123"}' | \
  grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)

echo "Token alındı: ${TOKEN:0:20}..."

# Kategorileri ekle
echo "Kategoriler ekleniyor..."
curl -s -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Klasik Perdeler","description":"Geleneksel tasarım ve kaliteli kumaşlarla üretilen klasik perdeler"}' > /dev/null

curl -s -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Modern Rollo Stor","description":"Pratik kullanım ve modern tasarımın buluştuğu rollo stor çözümleri"}' > /dev/null

curl -s -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Blackout Perdeler","description":"Maksimum ışık kontrolü sağlayan blackout perdeler"}' > /dev/null

curl -s -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Dekoratif Tüller","description":"Şık ve hafif tül perdeler ile zarif dekorasyon"}' > /dev/null

curl -s -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Zebra Stor","description":"Alternatif şeritli tasarımı ile öne çıkan zebra stor perdeler"}' > /dev/null

curl -s -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Pleatli Perdeler","description":"Düzenli kıvrımları ile şık görünüm sunan pleatli perdeler"}' > /dev/null

echo "Kategoriler eklendi!"

# Kategori ID'lerini al
CAT1=$(curl -s http://localhost:3000/categories -H "Authorization: Bearer $TOKEN" | grep -o '"id":1[^,]*' | head -1 | grep -o '[0-9]*')
CAT2=$(curl -s http://localhost:3000/categories -H "Authorization: Bearer $TOKEN" | grep -o '"id":2[^,]*' | head -1 | grep -o '[0-9]*')
CAT3=$(curl -s http://localhost:3000/categories -H "Authorization: Bearer $TOKEN" | grep -o '"id":3[^,]*' | head -1 | grep -o '[0-9]*')
CAT4=$(curl -s http://localhost:3000/categories -H "Authorization: Bearer $TOKEN" | grep -o '"id":4[^,]*' | head -1 | grep -o '[0-9]*')
CAT5=$(curl -s http://localhost:3000/categories -H "Authorization: Bearer $TOKEN" | grep -o '"id":5[^,]*' | head -1 | grep -o '[0-9]*')
CAT6=$(curl -s http://localhost:3000/categories -H "Authorization: Bearer $TOKEN" | grep -o '"id":6[^,]*' | head -1 | grep -o '[0-9]*')

echo "Kategori ID'leri: $CAT1, $CAT2, $CAT3, $CAT4, $CAT5, $CAT6"

# Ürünleri ekle
echo "Ürünler ekleniyor..."

# Klasik Perdeler (CAT1)
curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"Klasik Kadife Perde\",\"description\":\"Lüks kadife kumaştan üretilen, geleneksel tasarımlı klasik perde\",\"price\":225,\"imageUrl\":\"/perdeopt.png\",\"categoryId\":$CAT1}" > /dev/null

curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"Klasik Pamuklu Perde\",\"description\":\"Doğal pamuk kumaştan üretilen, nefes alabilir klasik perde\",\"price\":150,\"imageUrl\":\"/perdeopt.png\",\"categoryId\":$CAT1}" > /dev/null

# Modern Rollo Stor (CAT2)
curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"Modern Rollo Stor\",\"description\":\"Pratik kullanım ve modern tasarımın buluştuğu rollo stor\",\"price\":115,\"imageUrl\":\"/perdeopt.png\",\"categoryId\":$CAT2}" > /dev/null

curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"Motorlu Rollo Stor\",\"description\":\"Uzaktan kumandalı, otomatik açılıp kapanan motorlu rollo stor\",\"price\":300,\"imageUrl\":\"/perdeopt.png\",\"categoryId\":$CAT2}" > /dev/null

# Blackout Perdeler (CAT3)
curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"Blackout Perde\",\"description\":\"Maksimum ışık kontrolü sağlayan, tamamen karanlık ortam yaratan perde\",\"price\":185,\"imageUrl\":\"/perdeopt.png\",\"categoryId\":$CAT3}" > /dev/null

curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"Blackout Rollo\",\"description\":\"Pratik kullanımlı, maksimum ışık kontrolü sağlayan blackout rollo\",\"price\":150,\"imageUrl\":\"/perdeopt.png\",\"categoryId\":$CAT3}" > /dev/null

# Dekoratif Tüller (CAT4)
curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"Dekoratif Tül\",\"description\":\"Şık ve hafif tül perde ile zarif dekorasyon\",\"price\":85,\"imageUrl\":\"/perdeopt.png\",\"categoryId\":$CAT4}" > /dev/null

curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"İşlemeli Tül\",\"description\":\"Özel işlemeli desenli, dekoratif tül perde\",\"price\":115,\"imageUrl\":\"/perdeopt.png\",\"categoryId\":$CAT4}" > /dev/null

# Zebra Stor (CAT5)
curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"Zebra Stor\",\"description\":\"Alternatif şeritli tasarımı ile öne çıkan zebra stor perde\",\"price\":135,\"imageUrl\":\"/perdeopt.png\",\"categoryId\":$CAT5}" > /dev/null

curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"Zebra Blackout\",\"description\":\"Zebra desenli, ışık blokajı sağlayan özel stor\",\"price\":170,\"imageUrl\":\"/perdeopt.png\",\"categoryId\":$CAT5}" > /dev/null

# Pleatli Perdeler (CAT6)
curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"Pleatli Perde\",\"description\":\"Düzenli kıvrımları ile şık görünüm sunan pleatli perde\",\"price\":165,\"imageUrl\":\"/perdeopt.png\",\"categoryId\":$CAT6}" > /dev/null

curl -s -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"name\":\"Pleatli Stor\",\"description\":\"Pleatli tasarımlı, modern stor perde çözümü\",\"price\":145,\"imageUrl\":\"/perdeopt.png\",\"categoryId\":$CAT6}" > /dev/null

echo "Tüm ürünler eklendi!"

