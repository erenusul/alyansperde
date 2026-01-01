# Perde Projesi - Web Ödevi

React (Frontend) + NestJS (Backend) ile geliştirilmiş perde satış ve yönetim sistemi.

## Proje Yapısı

```
alyanstsxson1/
├── backend/          # NestJS Backend API
│   ├── src/
│   │   ├── entities/    # Veritabanı entity'leri
│   │   ├── auth/        # Authentication modülü
│   │   ├── categories/  # Kategori modülü
│   │   ├── products/    # Ürün modülü
│   │   ├── orders/      # Sipariş modülü
│   │   ├── favorites/   # Favori modülü
│   │   └── users/       # Kullanıcı modülü
│   └── package.json
├── frontend/        # React Frontend
│   ├── src/
│   │   ├── components/  # React component'leri
│   │   ├── pages/       # Sayfa component'leri
│   │   ├── services/    # API servisleri
│   │   └── context/     # React Context'leri
│   ├── public/          # Statik dosyalar
│   └── package.json
└── package.json     # Root package.json (monorepo)
```

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

1. Frontend klasörüne gidin:
```bash
cd frontend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Frontend'i başlatın:
```bash
npm run dev
```

### Monorepo Komutları (Root'tan)

Root dizinden tüm komutları çalıştırabilirsiniz:

```bash
# Frontend development server
npm run dev:frontend

# Backend development server
npm run dev:backend

# Her ikisini birlikte (farklı terminal'lerde)
npm run dev:frontend & npm run dev:backend
```

## Özellikler

- ✅ Kullanıcı kayıt ve giriş sistemi (JWT)
- ✅ Rol tabanlı yetkilendirme (ADMIN, USER)
- ✅ Kategori yönetimi (CRUD)
- ✅ Ürün yönetimi (CRUD)
- ✅ Sipariş yönetimi
- ✅ Favori sistemi (Many-to-Many ilişki)
- ✅ Admin paneli
- ✅ Kullanıcı paneli

## Veritabanı Yapısı

- **User**: Kullanıcılar (ADMIN, USER rolleri)
- **Category**: Kategoriler
- **Product**: Ürünler (Category ile bire-çok ilişki)
- **Order**: Siparişler
- **OrderItem**: Sipariş-ürün ilişkisi
- **Favorite**: Kullanıcı-ürün favori ilişkisi (Many-to-Many junction table)

## API Endpoints

Detaylı API dokümantasyonu için `backend/README.md` dosyasına bakın.
Swagger dokümantasyonu: `http://localhost:3000/api`
