# ✅ Kurulum Tamamlandı!

## Yapılan İşlemler

### 1. ✅ PostgreSQL Kurulumu
- PostgreSQL@14 kuruldu
- PostgreSQL servisi başlatıldı
- `perde_db` veritabanı oluşturuldu

### 2. ✅ Backend Yapılandırması
- `.env` dosyası oluşturuldu
- Veritabanı bağlantısı test edildi
- Backend başlatıldı ve çalışıyor
- **Backend URL:** http://localhost:3000

### 3. ✅ Frontend Yapılandırması
- Frontend başlatıldı ve çalışıyor
- **Frontend URL:** http://localhost:5173

## Proje Durumu

✅ **Backend:** Çalışıyor (http://localhost:3000)
✅ **Frontend:** Çalışıyor (http://localhost:5173)
✅ **Veritabanı:** Bağlı ve hazır

## İlk Adımlar

### 1. Frontend'e Erişim
Tarayıcınızda şu adresi açın:
```
http://localhost:5173
```

### 2. İlk Kullanıcı Oluşturma
1. `/register` sayfasına gidin
2. Yeni bir kullanıcı oluşturun
3. Giriş yapın

### 3. Admin Rolü Verme (İsteğe Bağlı)
Eğer bir kullanıcıyı admin yapmak isterseniz:

```bash
/opt/homebrew/opt/postgresql@14/bin/psql perde_db
```

Sonra:
```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## Kullanılabilir Sayfalar

### Genel Sayfalar
- `/` - Ana sayfa
- `/login` - Giriş sayfası
- `/register` - Kayıt sayfası

### Admin Sayfaları (ADMIN rolü gerekli)
- `/admin` - Admin dashboard
- `/admin/categories` - Kategori yönetimi
- `/admin/products` - Ürün yönetimi
- `/admin/orders` - Sipariş yönetimi

### Kullanıcı Sayfaları (USER rolü gerekli)
- `/user/products` - Ürün listesi ve sipariş verme
- `/user/orders` - Kendi siparişlerim

## Servisleri Durdurma

### Backend'i durdurmak için:
```bash
pkill -f "nest start"
```

### Frontend'i durdurmak için:
```bash
pkill -f "vite"
```

### PostgreSQL'i durdurmak için:
```bash
brew services stop postgresql@14
```

## Servisleri Yeniden Başlatma

### Backend:
```bash
cd backend
npm run start:dev
```

### Frontend:
```bash
npm run dev
```

### PostgreSQL:
```bash
brew services start postgresql@14
```

## Sorun Giderme

### Backend bağlanamıyorsa:
- PostgreSQL servisinin çalıştığından emin olun: `brew services list`
- `.env` dosyasının doğru olduğundan emin olun
- Port 3000'in kullanılabilir olduğundan emin olun

### Frontend bağlanamıyorsa:
- Port 5173'ün kullanılabilir olduğundan emin olun
- `npm install` komutunu çalıştırdığınızdan emin olun

### Veritabanı bağlantı hatası:
- PostgreSQL servisinin çalıştığından emin olun
- Kullanıcı adının doğru olduğundan emin olun (erenusul)
- Şifre boş olduğundan emin olun (varsayılan macOS PostgreSQL kurulumu)

## Proje Yapısı

```
alyanstsxson1/
├── backend/          # NestJS backend
│   ├── src/
│   │   ├── entities/ # Veritabanı entity'leri
│   │   ├── auth/     # Authentication modülü
│   │   ├── users/    # Kullanıcı modülü
│   │   ├── categories/ # Kategori modülü
│   │   ├── products/  # Ürün modülü
│   │   └── orders/    # Sipariş modülü
│   └── .env          # Backend yapılandırması
├── src/              # React frontend
│   ├── components/   # React bileşenleri
│   ├── pages/        # Sayfa bileşenleri
│   ├── services/     # API servisleri
│   └── context/      # React context'leri
└── README.md         # Proje dokümantasyonu
```

## API Endpoints

Tüm API endpoint'leri için `backend/README.md` dosyasına bakın.

## Notlar

- Backend ve Frontend şu anda arka planda çalışıyor
- Veritabanı otomatik olarak oluşturulacak (TypeORM synchronize modu)
- İlk kullanıcı kaydı USER rolünde olacak
- Admin rolü için manuel güncelleme gerekiyor

