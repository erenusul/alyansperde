# Perde Projesi - Web Ödevi

React (Frontend) + NestJS (Backend) ile geliştirilmiş perde satış ve yönetim sistemi.

## Proje Yapısı

- **Frontend**: React + TypeScript + Vite
- **Backend**: NestJS + TypeORM + PostgreSQL

## Kurulum

### Backend

1. Backend klasörüne gidin:
```bash
cd backend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun (backend klasöründe):
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

4. Backend'i başlatın:
```bash
npm run start:dev
```

### Frontend

1. Ana dizinde bağımlılıkları yükleyin:
```bash
npm install
```

2. Frontend'i başlatın:
```bash
npm run dev
```

## Özellikler

- ✅ Kullanıcı kayıt ve giriş sistemi (JWT)
- ✅ Rol tabanlı yetkilendirme (ADMIN, USER)
- ✅ Kategori yönetimi (CRUD)
- ✅ Ürün yönetimi (CRUD)
- ✅ Sipariş yönetimi
- ✅ Admin paneli
- ✅ Kullanıcı paneli

## Veritabanı Yapısı

- **User**: Kullanıcılar (ADMIN, USER rolleri)
- **Category**: Kategoriler
- **Product**: Ürünler (Category ile bire-çok ilişki)
- **Order**: Siparişler
- **OrderItem**: Sipariş-ürün ilişkisi (çoka-çok)

## API Endpoints

Detaylı API dokümantasyonu için `backend/README.md` dosyasına bakın.
