# Perde Projesi Backend

NestJS ile geliştirilmiş backend API.

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. PostgreSQL veritabanını hazırlayın ve `.env` dosyası oluşturun:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=perde_db

JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=24h

PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

3. Uygulamayı başlatın:
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/register` - Kullanıcı kaydı
- `POST /auth/login` - Kullanıcı girişi

### Categories (Kategoriler)
- `GET /categories` - Tüm kategorileri listele (Herkes)
- `GET /categories/:id` - Kategori detayı (Herkes)
- `POST /categories` - Yeni kategori ekle (Admin)
- `PATCH /categories/:id` - Kategori güncelle (Admin)
- `DELETE /categories/:id` - Kategori sil (Admin)

### Products (Ürünler)
- `GET /products` - Tüm ürünleri listele (Herkes)
- `GET /products?categoryId=1` - Kategoriye göre ürünleri listele (Herkes)
- `GET /products/:id` - Ürün detayı (Herkes)
- `POST /products` - Yeni ürün ekle (Admin)
- `PATCH /products/:id` - Ürün güncelle (Admin)
- `DELETE /products/:id` - Ürün sil (Admin)

### Orders (Siparişler)
- `POST /orders` - Yeni sipariş oluştur (Giriş yapmış kullanıcı)
- `GET /orders` - Siparişleri listele (Admin: Tümü, User: Kendi siparişleri)
- `GET /orders/:id` - Sipariş detayı (Admin: Tümü, User: Kendi siparişi)
- `PATCH /orders/:id` - Sipariş durumu güncelle (Admin)
- `DELETE /orders/:id` - Sipariş sil (Admin)

### Users (Kullanıcılar)
- `GET /users` - Tüm kullanıcıları listele (Admin)
- `GET /users/:id` - Kullanıcı detayı (Admin)
- `POST /users` - Yeni kullanıcı oluştur (Admin)
- `PATCH /users/:id` - Kullanıcı güncelle (Admin)
- `DELETE /users/:id` - Kullanıcı sil (Admin)

## Veritabanı Yapısı

- **User**: Kullanıcı bilgileri (email, password, name, role)
- **Category**: Kategori bilgileri (name, description)
- **Product**: Ürün bilgileri (name, description, price, imageUrl, categoryId)
- **Order**: Sipariş bilgileri (status, totalPrice, userId)
- **OrderItem**: Sipariş-ürün ilişkisi (orderId, productId, quantity)

## İlişkiler

- **Bire-çok**: Category → Product (Bir kategori birden fazla ürüne sahip)
- **Çoka-çok**: User ↔ Product (OrderItem üzerinden - Bir kullanıcı birden fazla ürün sipariş edebilir)
