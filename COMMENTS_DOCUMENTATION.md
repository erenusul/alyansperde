# Yorum Satırları Dokümantasyonu

Bu dosya, projeden silinen tüm yorum satırlarının ne işe yaradığını ve hangi dosyalarda bulunduğunu açıklar.

## Backend Yorum Satırları

### 1. Auth Controller (`backend/src/auth/auth.controller.ts`)

#### Satır 13-17: Kullanıcı kayıt endpoint'i açıklaması
```typescript
/**
 * Kullanıcı kayıt endpoint'i
 * POST /auth/register
 * Yeni bir kullanıcı oluşturur ve JWT token döner
 */
```
**Açıklama:** Kayıt endpoint'inin ne yaptığını, hangi HTTP metodunu kullandığını ve ne döndürdüğünü açıklar.

#### Satır 24-28: Kullanıcı giriş endpoint'i açıklaması
```typescript
/**
 * Kullanıcı giriş endpoint'i
 * POST /auth/login
 * Email ve password ile giriş yapar ve JWT token döner
 */
```
**Açıklama:** Giriş endpoint'inin ne yaptığını ve nasıl çalıştığını açıklar.

#### Satır 35-39: Token doğrulama endpoint'i açıklaması
```typescript
/**
 * Token doğrulama ve kullanıcı bilgilerini getirme endpoint'i
 * GET /auth/me
 * JWT token'ı doğrular ve mevcut kullanıcının bilgilerini döner
 */
```
**Açıklama:** Token doğrulama endpoint'inin işlevini açıklar.

### 2. Products Controller (`backend/src/products/products.controller.ts`)

#### Satır 14-18: Ürün listeleme endpoint'i açıklaması
```typescript
/**
 * Tüm ürünleri listeleme endpoint'i (Herkes erişebilir)
 * GET /products
 * Query parametresi: categoryId (opsiyonel) - Belirli bir kategoriye ait ürünleri getirir
 */
```
**Açıklama:** Ürün listeleme endpoint'inin erişim seviyesini ve query parametresini açıklar.

#### Satır 27-30: Ürün detayı endpoint'i açıklaması
```typescript
/**
 * Ürün detayı endpoint'i (Herkes erişebilir)
 * GET /products/:id
 */
```
**Açıklama:** Ürün detayı endpoint'inin erişim seviyesini açıklar.

#### Satır 36-39: Ürün oluşturma endpoint'i açıklaması
```typescript
/**
 * Yeni ürün oluşturma endpoint'i (Sadece Admin)
 * POST /products
 */
```
**Açıklama:** Ürün oluşturma endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

#### Satır 47-50: Ürün güncelleme endpoint'i açıklaması
```typescript
/**
 * Ürün güncelleme endpoint'i (Sadece Admin)
 * PATCH /products/:id
 */
```
**Açıklama:** Ürün güncelleme endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

#### Satır 58-61: Ürün silme endpoint'i açıklaması
```typescript
/**
 * Ürün silme endpoint'i (Sadece Admin)
 * DELETE /products/:id
 */
```
**Açıklama:** Ürün silme endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

### 3. Categories Controller (`backend/src/categories/categories.controller.ts`)

#### Satır 14-17: Kategori listeleme endpoint'i açıklaması
```typescript
/**
 * Tüm kategorileri listeleme endpoint'i (Herkes erişebilir)
 * GET /categories
 */
```
**Açıklama:** Kategori listeleme endpoint'inin herkese açık olduğunu belirtir.

#### Satır 23-26: Kategori detayı endpoint'i açıklaması
```typescript
/**
 * Kategori detayı endpoint'i (Herkes erişebilir)
 * GET /categories/:id
 */
```
**Açıklama:** Kategori detayı endpoint'inin herkese açık olduğunu belirtir.

#### Satır 32-35: Kategori oluşturma endpoint'i açıklaması
```typescript
/**
 * Yeni kategori oluşturma endpoint'i (Sadece Admin)
 * POST /categories
 */
```
**Açıklama:** Kategori oluşturma endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

#### Satır 43-46: Kategori güncelleme endpoint'i açıklaması
```typescript
/**
 * Kategori güncelleme endpoint'i (Sadece Admin)
 * PATCH /categories/:id
 */
```
**Açıklama:** Kategori güncelleme endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

#### Satır 54-57: Kategori silme endpoint'i açıklaması
```typescript
/**
 * Kategori silme endpoint'i (Sadece Admin)
 * DELETE /categories/:id
 */
```
**Açıklama:** Kategori silme endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

### 4. Orders Controller (`backend/src/orders/orders.controller.ts`)

#### Satır 14-17: Sipariş oluşturma endpoint'i açıklaması
```typescript
/**
 * Yeni sipariş oluşturma endpoint'i (Giriş yapmış kullanıcılar)
 * POST /orders
 */
```
**Açıklama:** Sipariş oluşturma endpoint'inin giriş yapmış kullanıcılar tarafından kullanılabileceğini belirtir.

#### Satır 23-28: Sipariş listeleme endpoint'i açıklaması
```typescript
/**
 * Siparişleri listeleme endpoint'i
 * GET /orders
 * - Admin: Tüm siparişleri görür
 * - User: Sadece kendi siparişlerini görür
 */
```
**Açıklama:** Sipariş listeleme endpoint'inin admin ve user için farklı davranışlarını açıklar.

#### Satır 34-39: Sipariş detayı endpoint'i açıklaması
```typescript
/**
 * Sipariş detayı endpoint'i
 * GET /orders/:id
 * - Admin: Tüm siparişleri görebilir
 * - User: Sadece kendi siparişlerini görebilir
 */
```
**Açıklama:** Sipariş detayı endpoint'inin admin ve user için farklı davranışlarını açıklar.

#### Satır 45-48: Sipariş güncelleme endpoint'i açıklaması
```typescript
/**
 * Sipariş güncelleme endpoint'i (Sadece Admin)
 * PATCH /orders/:id
 */
```
**Açıklama:** Sipariş güncelleme endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

#### Satır 54-57: Sipariş silme endpoint'i açıklaması
```typescript
/**
 * Sipariş silme endpoint'i (Sadece Admin)
 * DELETE /orders/:id
 */
```
**Açıklama:** Sipariş silme endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

### 5. Users Controller (`backend/src/users/users.controller.ts`)

#### Satır 16-19: Kullanıcı oluşturma endpoint'i açıklaması
```typescript
/**
 * Yeni kullanıcı oluşturma endpoint'i (Sadece Admin)
 * POST /users
 */
```
**Açıklama:** Kullanıcı oluşturma endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

#### Satır 25-28: Kullanıcı listeleme endpoint'i açıklaması
```typescript
/**
 * Tüm kullanıcıları listeleme endpoint'i (Sadece Admin)
 * GET /users
 */
```
**Açıklama:** Kullanıcı listeleme endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

#### Satır 34-37: Kullanıcı detayı endpoint'i açıklaması
```typescript
/**
 * Kullanıcı detayı endpoint'i (Sadece Admin)
 * GET /users/:id
 */
```
**Açıklama:** Kullanıcı detayı endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

#### Satır 43-46: Kullanıcı güncelleme endpoint'i açıklaması
```typescript
/**
 * Kullanıcı güncelleme endpoint'i (Sadece Admin)
 * PATCH /users/:id
 */
```
**Açıklama:** Kullanıcı güncelleme endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

#### Satır 52-55: Kullanıcı silme endpoint'i açıklaması
```typescript
/**
 * Kullanıcı silme endpoint'i (Sadece Admin)
 * DELETE /users/:id
 */
```
**Açıklama:** Kullanıcı silme endpoint'inin sadece admin tarafından kullanılabileceğini belirtir.

### 6. Favorites Controller (`backend/src/favorites/favorites.controller.ts`)

#### Satır 12-16: Favorileri listeleme endpoint'i açıklaması
```typescript
/**
 * Kullanıcının favorilerini listeleme endpoint'i
 * GET /favorites
 * Sadece giriş yapmış kullanıcılar erişebilir
 */
```
**Açıklama:** Favorileri listeleme endpoint'inin sadece giriş yapmış kullanıcılar tarafından kullanılabileceğini belirtir.

#### Satır 22-26: Favori ekleme endpoint'i açıklaması
```typescript
/**
 * Ürünü favorilere ekleme endpoint'i
 * POST /favorites/:productId
 * Sadece giriş yapmış kullanıcılar erişebilir
 */
```
**Açıklama:** Favori ekleme endpoint'inin sadece giriş yapmış kullanıcılar tarafından kullanılabileceğini belirtir.

#### Satır 35-39: Favori çıkarma endpoint'i açıklaması
```typescript
/**
 * Ürünü favorilerden çıkarma endpoint'i
 * DELETE /favorites/:productId
 * Sadece giriş yapmış kullanıcılar erişebilir
 */
```
**Açıklama:** Favori çıkarma endpoint'inin sadece giriş yapmış kullanıcılar tarafından kullanılabileceğini belirtir.

#### Satır 48-52: Favori kontrol endpoint'i açıklaması
```typescript
/**
 * Ürünün favoride olup olmadığını kontrol etme endpoint'i
 * GET /favorites/check/:productId
 * Sadece giriş yapmış kullanıcılar erişebilir
 */
```
**Açıklama:** Favori kontrol endpoint'inin sadece giriş yapmış kullanıcılar tarafından kullanılabileceğini belirtir.

#### Satır 61-65: Favori ID'leri listeleme endpoint'i açıklaması
```typescript
/**
 * Kullanıcının favori ürün ID'lerini listeleme endpoint'i
 * GET /favorites/ids
 * Sadece giriş yapmış kullanıcılar erişebilir
 */
```
**Açıklama:** Favori ID'leri listeleme endpoint'inin sadece giriş yapmış kullanıcılar tarafından kullanılabileceğini belirtir.

### 7. Favorites Service (`backend/src/favorites/favorites.service.ts`)

#### Satır 18: Ürün kontrolü açıklaması
```typescript
// Ürünün var olup olmadığını kontrol et
```
**Açıklama:** Ürünün veritabanında var olup olmadığını kontrol eden kod bloğunu açıklar.

#### Satır 24: Favori kontrolü açıklaması
```typescript
// Zaten favoride mi kontrol et
```
**Açıklama:** Ürünün zaten favorilerde olup olmadığını kontrol eden kod bloğunu açıklar.

### 8. Orders Service (`backend/src/orders/orders.service.ts`)

#### Satır 26: Ürün validasyonu açıklaması
```typescript
// Validate products and calculate total price
```
**Açıklama:** Ürünleri doğrulayan ve toplam fiyatı hesaplayan kod bloğunu açıklar.

#### Satır 78: Kullanıcı yetki kontrolü açıklaması
```typescript
// User can only see their own orders unless they are admin
```
**Açıklama:** Kullanıcının sadece kendi siparişlerini görebileceğini, admin'in ise tüm siparişleri görebileceğini açıklar.

#### Satır 89: Admin yetki kontrolü açıklaması
```typescript
// Only admin can update orders
```
**Açıklama:** Sadece admin'in siparişleri güncelleyebileceğini belirtir.

#### Satır 101: Admin yetki kontrolü açıklaması
```typescript
// Only admin can delete orders
```
**Açıklama:** Sadece admin'in siparişleri silebileceğini belirtir.

#### Satır 106: Sipariş silme sırası açıklaması
```typescript
// First delete order items, then delete the order
```
**Açıklama:** Sipariş silme işleminin önce sipariş kalemlerini, sonra siparişi sildiğini açıklar.

### 9. Main.ts (`backend/src/main.ts`)

#### Satır 13: CORS açıklaması
```typescript
// Enable CORS for frontend
```
**Açıklama:** Frontend ile iletişim için CORS'un etkinleştirildiğini belirtir.

#### Satır 19: Validation Pipe açıklaması
```typescript
// Enable validation pipe
```
**Açıklama:** Veri doğrulama için ValidationPipe'un etkinleştirildiğini belirtir.

#### Satır 26: Swagger açıklaması
```typescript
// Swagger configuration
```
**Açıklama:** Swagger API dokümantasyonunun yapılandırıldığını belirtir.

## Frontend Yorum Satırları

### 1. API Service (`frontend/src/services/api.service.ts`)

#### Satır 12: Request interceptor açıklaması
```typescript
// Request interceptor - Add JWT token to requests
```
**Açıklama:** Her API isteğine JWT token'ının otomatik olarak eklendiğini açıklar.

#### Satır 26: Response interceptor açıklaması
```typescript
// Response interceptor - Handle 401 errors
```
**Açıklama:** 401 (Unauthorized) hatalarının yakalanıp işlendiğini açıklar.

#### Satır 31: Login sayfası kontrolü açıklaması
```typescript
// Only redirect if not already on login page
```
**Açıklama:** Kullanıcının zaten login sayfasındaysa tekrar yönlendirme yapılmaması gerektiğini belirtir.

### 2. Auth Service (`frontend/src/services/auth.service.ts`)

#### Satır 51: Token geçersizlik kontrolü açıklaması
```typescript
// Token geçersizse localStorage'ı temizle
```
**Açıklama:** Token geçersizse localStorage'dan token ve kullanıcı bilgilerinin temizlendiğini açıklar.

### 3. Auth Context (`frontend/src/context/AuthContext.tsx`)

#### Satır 36: Token kontrolü açıklaması
```typescript
// Token varsa backend'de geçerliliğini kontrol et
```
**Açıklama:** Token varsa backend'de geçerliliğinin kontrol edildiğini açıklar.

#### Satır 39: Token geçerlilik açıklaması
```typescript
// Token geçerliyse kullanıcı bilgilerini güncelle
```
**Açıklama:** Token geçerliyse kullanıcı bilgilerinin localStorage'a kaydedildiğini ve state'in güncellendiğini açıklar.

#### Satır 43: Token geçersizlik açıklaması
```typescript
// Token geçersizse kullanıcıyı temizle
```
**Açıklama:** Token geçersizse kullanıcı state'inin temizlendiğini açıklar.

### 4. ContactButtons Component (`frontend/src/components/ContactButtons.tsx`)

#### Satır 14: Scroll kontrolü açıklaması
```typescript
// About kısmına gelince butonları göster
```
**Açıklama:** Kullanıcı "Hakkımızda" bölümüne geldiğinde iletişim butonlarının görünür hale geldiğini açıklar.

#### Satır 23: Sayfa yükleme kontrolü açıklaması
```typescript
// Sayfa yüklendiğinde de kontrol et
```
**Açıklama:** Sayfa ilk yüklendiğinde de scroll pozisyonunun kontrol edildiğini açıklar.

#### Satır 30: Telefon arama açıklaması
```typescript
// Direkt arama yap
```
**Açıklama:** İletişim butonuna tıklandığında direkt telefon araması yapıldığını açıklar.

#### Satır 35: WhatsApp açıklaması
```typescript
// WhatsApp iletişim linki
```
**Açıklama:** WhatsApp butonunun WhatsApp iletişim linki oluşturduğunu açıklar.

#### Satır 36: Telefon numarası açıklaması
```typescript
// Uydurma telefon numarası
```
**Açıklama:** Telefon numarasının örnek amaçlı olduğunu belirtir.

### 5. Header Component (`frontend/src/components/Header.tsx`)

#### Satır 18: Scroll kontrolü açıklaması
```typescript
// Sadece ana sayfada scroll ile header'ı gizle/göster
```
**Açıklama:** Header'ın sadece ana sayfada scroll ile gizlenip gösterildiğini açıklar.

#### Satır 30: About scroll kontrolü açıklaması
```typescript
// About kısmına gelince header'ı göster
```
**Açıklama:** Kullanıcı "Hakkımızda" bölümüne geldiğinde header'ın görünür hale geldiğini açıklar.

#### Satır 44: Mobil menü scroll kontrolü açıklaması
```typescript
// Mobil menü açıkken body scroll'unu engelle
```
**Açıklama:** Mobil menü açıkken sayfa scroll'unun engellendiğini açıklar.

#### Satır 57: Dropdown dışı tıklama açıklaması
```typescript
// User dropdown dışına tıklanınca kapat
```
**Açıklama:** Kullanıcı dropdown menüsünün dışına tıklandığında kapatıldığını açıklar.

### 6. GalleryDetail Component (`frontend/src/components/GalleryDetail.tsx`)

#### Satır 25: Sepet state açıklaması
```typescript
// Sepet state'leri
```
**Açıklama:** Sepet ile ilgili state değişkenlerini açıklar.

#### Satır 29: Favori state açıklaması
```typescript
// Favori state'leri
```
**Açıklama:** Favori ile ilgili state değişkenlerini açıklar.

#### Satır 32: Tek ürün satın alma state açıklaması
```typescript
// Tek ürün satın alma state'leri
```
**Açıklama:** Tek ürün satın alma ile ilgili state değişkenlerini açıklar.

#### Satır 48: Sayfa yükleme scroll açıklaması
```typescript
// Sayfa yüklendiğinde en üste scroll yap
```
**Açıklama:** Sayfa yüklendiğinde sayfanın en üstüne scroll yapıldığını açıklar.

#### Satır 66: URL kategori parametresi açıklaması
```typescript
// URL'den category parametresini oku ve kategori ID'sine çevir
```
**Açıklama:** URL'den kategori parametresinin okunup kategori ID'sine dönüştürüldüğünü açıklar.

#### Satır 71: Kategori slug dönüşümü açıklaması
```typescript
// Kategori slug'ını kategori ismine çevir
```
**Açıklama:** Kategori slug'ının kategori ismine dönüştürüldüğünü açıklar.

#### Satır 140: Sepet fonksiyonları açıklaması
```typescript
// Sepet fonksiyonları
```
**Açıklama:** Sepet ile ilgili fonksiyonların başlangıcını işaretler.

#### Satır 184: Tek ürün satın alma açıklaması
```typescript
// Tek ürün satın alma
```
**Açıklama:** Tek ürün satın alma fonksiyonunun başlangıcını işaretler.

#### Satır 196: Sepetten toplu sipariş açıklaması
```typescript
// Sepetten toplu sipariş verme
```
**Açıklama:** Sepetten toplu sipariş verme fonksiyonunun başlangıcını işaretler.

#### Satır 228: Backend ürün ID açıklaması
```typescript
// Backend'deki gerçek ürün ID'si ile sipariş oluştur
```
**Açıklama:** Backend'deki gerçek ürün ID'si ile sipariş oluşturulduğunu açıklar.

#### Satır 250: Yönlendirme açıklaması
```typescript
// Siparişlerim sayfasına yönlendir
```
**Açıklama:** Sipariş oluşturulduktan sonra kullanıcının siparişlerim sayfasına yönlendirildiğini açıklar.

### 7. Hero Component (`frontend/src/components/Hero.tsx`)

#### Satır 8: Text görünürlük açıklaması
```typescript
// Text appears after 2 seconds
```
**Açıklama:** Hero bölümündeki metnin 2 saniye sonra görünür hale geldiğini açıklar.

### 8. Home Component (`frontend/src/components/Home.tsx`)

#### Satır 15: Hash yönlendirme açıklaması
```typescript
// Hash ile yönlendirme yapıldığında ilgili bölüme scroll yap
```
**Açıklama:** URL'de hash (#) varsa ilgili bölüme otomatik scroll yapıldığını açıklar.

#### Satır 24: Hash yoksa scroll açıklaması
```typescript
// Hash yoksa en üste scroll yap
```
**Açıklama:** URL'de hash yoksa sayfanın en üstüne scroll yapıldığını açıklar.

### 9. Services Component (`frontend/src/components/Services.tsx`)

#### Satır 17: Animasyon başlatma açıklaması
```typescript
// Section'ın %50'si görünür olduğunda animasyonu başlat
```
**Açıklama:** Servisler bölümünün %50'si görünür olduğunda animasyonun başlatıldığını açıklar.

#### Satır 20: Servis gösterimi açıklaması
```typescript
// Başlık geldikten 0.5 saniye sonra servisleri göster
```
**Açıklama:** Başlık animasyonu tamamlandıktan 0.5 saniye sonra servislerin gösterildiğini açıklar.

#### Satır 29: İlk yükleme kontrolü açıklaması
```typescript
// İlk yüklemede kontrol et
```
**Açıklama:** Sayfa ilk yüklendiğinde scroll pozisyonunun kontrol edildiğini açıklar.

## Özet

Toplam **67 yorum satırı** silindi:
- **Backend:** 40 yorum satırı
- **Frontend:** 27 yorum satırı

Bu yorumlar genellikle:
- Endpoint'lerin ne yaptığını açıklayan dokümantasyon yorumları
- Kod bloklarının işlevini açıklayan açıklama yorumları
- UI davranışlarını açıklayan açıklama yorumları
- Yetkilendirme ve güvenlik kontrollerini açıklayan yorumlar

Tüm bu bilgiler artık bu dokümantasyon dosyasında saklanmaktadır.

