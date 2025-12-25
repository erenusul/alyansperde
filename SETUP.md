# Kurulum Talimatları

## 1. PostgreSQL Kurulumu

PostgreSQL sisteminizde kurulu değil. Kurmak için:

### macOS (Homebrew ile):
```bash
brew install postgresql@14
brew services start postgresql@14
```

### Alternatif (Postgres.app):
https://postgresapp.com/ adresinden indirip kurabilirsiniz.

### PostgreSQL Kurulumu Sonrası:
```bash
# PostgreSQL'e bağlan
psql postgres

# Veritabanı oluştur
CREATE DATABASE perde_db;

# Çıkış
\q
```

## 2. Backend .env Dosyası Oluşturma

`backend` klasöründe `.env` dosyası oluşturun:

```bash
cd backend
touch .env
```

`.env` dosyasına şu içeriği ekleyin:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=perde_db

JWT_SECRET=perde-project-secret-key-2024-change-in-production
JWT_EXPIRES_IN=24h

PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Not:** PostgreSQL şifreniz farklıysa `DB_PASSWORD` değerini güncelleyin.

## 3. Backend'i Başlatma

```bash
cd backend
npm install  # İlk kez çalıştırıyorsanız
npm run start:dev
```

Backend `http://localhost:3000` adresinde çalışacak.

## 4. Frontend'i Başlatma

Yeni bir terminal penceresi açın:

```bash
# Ana dizinde
npm install  # İlk kez çalıştırıyorsanız
npm run dev
```

Frontend `http://localhost:5173` adresinde çalışacak.

## 5. İlk Kullanıcı Oluşturma

1. Frontend'te `/register` sayfasına gidin
2. Yeni bir kullanıcı oluşturun (varsayılan olarak USER rolünde olacak)
3. Admin rolü için PostgreSQL'de manuel olarak güncelleme yapabilirsiniz:

```sql
psql perde_db
UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## Sorun Giderme

### PostgreSQL bağlantı hatası:
- PostgreSQL servisinin çalıştığından emin olun: `brew services list`
- Şifrenin doğru olduğundan emin olun
- Port 5432'nin kullanılabilir olduğundan emin olun

### Backend başlamıyor:
- `.env` dosyasının `backend` klasöründe olduğundan emin olun
- `npm install` komutunu çalıştırdığınızdan emin olun
- Port 3000'in kullanılabilir olduğundan emin olun

### Frontend başlamıyor:
- `npm install` komutunu çalıştırdığınızdan emin olun
- Port 5173'ün kullanılabilir olduğundan emin olun

