# Proje Yapısı

Bu dokümantasyon, projenin klasör yapısını ve her klasörün amacını açıklar.

## Genel Yapı

```
alyanstsxson1/
├── backend/          # NestJS Backend API
├── frontend/         # React Frontend
├── package.json      # Root package.json (Monorepo yönetimi)
└── README.md         # Ana proje dokümantasyonu
```

## Backend Klasörü (`backend/`)

NestJS framework'ü ile geliştirilmiş RESTful API sunucusu.

### Önemli Alt Klasörler:

- **`src/entities/`**: Veritabanı entity'leri (TypeORM)
  - `user.entity.ts` - Kullanıcı entity'si
  - `category.entity.ts` - Kategori entity'si
  - `product.entity.ts` - Ürün entity'si
  - `order.entity.ts` - Sipariş entity'si
  - `order-item.entity.ts` - Sipariş kalemi entity'si
  - `favorite.entity.ts` - Favori entity'si (Many-to-Many junction table)

- **`src/auth/`**: Authentication modülü
  - JWT token yönetimi
  - Login/Register endpoint'leri
  - Guards ve decorators

- **`src/categories/`**: Kategori yönetim modülü
- **`src/products/`**: Ürün yönetim modülü
- **`src/orders/`**: Sipariş yönetim modülü
- **`src/favorites/`**: Favori yönetim modülü
- **`src/users/`**: Kullanıcı yönetim modülü
- **`src/config/`**: Konfigürasyon dosyaları (TypeORM, vb.)

### Çalıştırma:
```bash
cd backend
npm install
npm run start:dev
```

## Frontend Klasörü (`frontend/`)

React + TypeScript + Vite ile geliştirilmiş kullanıcı arayüzü.

### Önemli Alt Klasörler:

- **`src/components/`**: Yeniden kullanılabilir React component'leri
  - `Header.tsx` - Üst navigasyon menüsü
  - `Home.tsx` - Ana sayfa container
  - `Gallery.tsx` - Ürün galerisi
  - `Login.tsx` - Giriş sayfası
  - `Register.tsx` - Kayıt sayfası
  - `ProtectedRoute.tsx` - Korumalı route wrapper

- **`src/pages/`**: Sayfa component'leri
  - **`admin/`**: Admin paneli sayfaları
    - `Dashboard.tsx` - Admin ana sayfa
    - `Categories.tsx` - Kategori yönetimi
    - `Products.tsx` - Ürün yönetimi
    - `Orders.tsx` - Sipariş yönetimi
  - **`user/`**: Kullanıcı sayfaları
    - `Products.tsx` - Ürün listesi
    - `MyOrders.tsx` - Siparişlerim
    - `Favorites.tsx` - Favorilerim

- **`src/services/`**: API servisleri
  - `api.service.ts` - Axios instance ve interceptors
  - `auth.service.ts` - Authentication servisi
  - `products.service.ts` - Ürün servisi
  - `categories.service.ts` - Kategori servisi
  - `orders.service.ts` - Sipariş servisi
  - `favorites.service.ts` - Favori servisi

- **`src/context/`**: React Context'leri
  - `AuthContext.tsx` - Global authentication state

- **`public/`**: Statik dosyalar (görseller, fontlar)
- **`dist/`**: Build çıktısı (production)

### Çalıştırma:
```bash
cd frontend
npm install
npm run dev
```

## Veritabanı Entity'leri

Tüm veritabanı entity'leri `backend/src/entities/` klasöründe bulunur:

1. **User** - Kullanıcılar (ADMIN, USER rolleri)
2. **Category** - Kategoriler
3. **Product** - Ürünler
4. **Order** - Siparişler
5. **OrderItem** - Sipariş kalemleri
6. **Favorite** - Favoriler (Many-to-Many junction table)

## İlişkiler

- **One-to-Many**: User → Order, Category → Product, Order → OrderItem, Product → OrderItem
- **Many-to-Many**: User ↔ Product (Favorite junction table üzerinden)

## Notlar

- Her modül kendi klasöründe (`controller`, `service`, `module`, `dto` dosyalarıyla)
- Entity'ler `entities/` klasöründe merkezi olarak yönetilir
- Frontend ve backend tamamen ayrı klasörlerde, bağımsız çalışabilir

