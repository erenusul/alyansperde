import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHome, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../context/AuthContext';
import { ordersService } from '../services/orders.service';
import { productsService } from '../services/products.service';
import { categoriesService } from '../services/categories.service';
import { favoritesService } from '../services/favorites.service';
import type { Product } from '../services/products.service';
import type { Category } from '../services/categories.service';
import './GalleryDetail.css';

const GalleryDetail: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  const [cart, setCart] = useState<Array<{ productId: number; quantity: number }>>([]);
  const [showCart, setShowCart] = useState(false);
  
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    address: '',
    city: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
    if (user) {
      loadFavorites();
    }
  }, [user]);
  
  const loadFavorites = async () => {
    try {
      const ids = await favoritesService.getFavoriteIds();
      setFavoriteIds(ids);
    } catch (error) {
      console.error('Favoriler yüklenirken hata:', error);
    }
  };

  useEffect(() => {
    const urlCategory = searchParams.get('category') || category || 'all';
    if (urlCategory === 'all') {
      setSelectedCategoryId(null);
    } else if (categories.length > 0) {
      const categoryMap: { [key: string]: string } = {
        'klasik': 'Klasik Perdeler',
        'modern': 'Modern Rollo Stor',
        'blackout': 'Blackout Perdeler',
        'tul': 'Dekoratif Tüller',
        'zebra': 'Zebra Stor',
        'pleatli': 'Pleatli Perdeler'
      };
      const categoryName = categoryMap[urlCategory];
      if (categoryName) {
        const foundCategory = categories.find(cat => cat.name === categoryName);
        if (foundCategory) {
          setSelectedCategoryId(foundCategory.id);
        } else {
          setSelectedCategoryId(null);
        }
      } else {
        setSelectedCategoryId(null);
      }
    }
  }, [searchParams, category, categories]);

  useEffect(() => {
    loadProducts();
  }, [selectedCategoryId]);

  const loadData = async () => {
    try {
      const [categoriesData, productsData] = await Promise.all([
        categoriesService.getAll(),
        productsService.getAll()
      ]);
      setCategories(categoriesData);
      setProducts(productsData);
    } catch (error) {
      console.error('Veriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = selectedCategoryId
        ? await productsService.getAll(selectedCategoryId)
        : await productsService.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategoryId === null || product.categoryId === selectedCategoryId;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categoryFilters = [
    { value: null, label: 'Tüm Kategoriler' },
    ...categories.map(cat => ({ value: cat.id, label: cat.name }))
  ];

  const addToCart = (productId: number) => {
    if (!user) {
      alert('Sepete eklemek için lütfen giriş yapın.');
      navigate('/login');
      return;
    }
    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { productId, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(
      cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product ? Number(product.price) * item.quantity : 0);
    }, 0);
  };

  const handleBuyClick = (product: Product) => {
    if (!user) {
      alert('Satın alma işlemi için lütfen giriş yapın.');
      navigate('/login');
      return;
    }
    setSelectedProduct(product);
    setQuantity(1);
    setShowPaymentModal(true);
  };

  const handleCartCheckout = async () => {
    if (cart.length === 0) {
      alert('Sepetiniz boş!');
      return;
    }

    if (!user) {
      alert('Sipariş vermek için lütfen giriş yapın.');
      navigate('/login');
      return;
    }

    try {
      await ordersService.create({ items: cart });
      setCart([]);
      setShowCart(false);
      alert('Siparişiniz başarıyla oluşturuldu!');
      navigate('/user/orders');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu.');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) return;

    setIsProcessing(true);
    
    try {
      await ordersService.create({
        items: [{
          productId: selectedProduct.id,
          quantity: quantity
        }]
      });

      alert('Siparişiniz başarıyla oluşturuldu!');
      setShowPaymentModal(false);
      setSelectedProduct(null);
      setQuantity(1);
      setPaymentData({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
        address: '',
        city: '',
        phone: ''
      });
      
      navigate('/user/orders');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleFavorite = async (productId: number) => {
    if (!user) {
      alert('Favorilere eklemek için giriş yapmalısınız');
      navigate('/login');
      return;
    }

    try {
      const isFavorite = favoriteIds.includes(productId);
      if (isFavorite) {
        await favoritesService.remove(productId);
        setFavoriteIds(favoriteIds.filter((id) => id !== productId));
      } else {
        await favoritesService.add(productId);
        setFavoriteIds([...favoriteIds, productId]);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'İşlem başarısız');
    }
  };

  const getProductImageUrl = (product: Product): string => {
    // Eğer imageUrl varsa ve geçerli bir URL ise direkt kullan
    if (product.imageUrl && product.imageUrl.trim() !== '') {
      const trimmedUrl = product.imageUrl.trim();
      // http:// veya https:// ile başlıyorsa (dış URL) veya / ile başlıyorsa (iç URL) kullan
      if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://') || trimmedUrl.startsWith('/')) {
        return trimmedUrl;
      }
    }
    
    // Kategoriye göre varsayılan görsel (hem kategori adına hem de ID'ye göre)
    const categoryImageMap: { [key: string]: string } = {
      'Klasik Perdeler': '/alyansperdegorselleroptimize/Klasik_Kadife_Perde.png',
      'Modern Rollo Stor': '/alyansperdegorselleroptimize/Modern_Rollo_Stor.png',
      'Blackout Perdeler': '/alyansperdegorselleroptimize/Blackout_Perde.png',
      'Dekoratif Tüller': '/alyansperdegorselleroptimize/Dekoratif_Tül_Perde.png',
      'Zebra Stor': '/alyansperdegorselleroptimize/Zebra_Stor_Perde.png',
      'Pleatli Perdeler': '/alyansperdegorselleroptimize/Pleatli_Perde.png'
    };
    
    // Önce kategori adına göre kontrol et
    const categoryName = product.category?.name || '';
    if (categoryName && categoryImageMap[categoryName]) {
      return categoryImageMap[categoryName];
    }
    
    // Kategori ID'sine göre kontrol et (fallback)
    // Klasik Perdeler genelde ID 1, Modern Rollo Stor ID 3, vb.
    const categoryIdMap: { [key: number]: string } = {
      1: '/alyansperdegorselleroptimize/Klasik_Kadife_Perde.png',
      3: '/alyansperdegorselleroptimize/Modern_Rollo_Stor.png',
      4: '/alyansperdegorselleroptimize/Blackout_Perde.png',
      5: '/alyansperdegorselleroptimize/Dekoratif_Tül_Perde.png',
      6: '/alyansperdegorselleroptimize/Zebra_Stor_Perde.png',
      7: '/alyansperdegorselleroptimize/Pleatli_Perde.png'
    };
    
    if (product.categoryId && categoryIdMap[product.categoryId]) {
      return categoryIdMap[product.categoryId];
    }
    
    return '/perdeopt.png';
  };



  return (
    <div className="gallery-detail">
      <div className="gallery-detail-container">
        <Link to="/#galeri" className="back-to-home-btn">
          <FontAwesomeIcon icon={faHome} /> Ana Sayfa
        </Link>
        <div className="gallery-detail-header">
          <h1 className="gallery-detail-title">
            TÜM PERDE ÇEŞİTLERİ
          </h1>
          {user && (
            <button onClick={() => setShowCart(true)} className="cart-button">
              <FontAwesomeIcon icon={faShoppingCart} /> Sepet ({cart.length})
            </button>
          )}
        </div>

        <div className="filter-section">
          <div className="search-row">
            <h3 className="filter-title">Arama</h3>
            <div className="search-container">
              <input
                type="text"
                placeholder="Perde adı veya açıklama ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <h3 className="filter-title">Kategoriye Göre Filtrele</h3>
            <div className="filter-buttons">
              {categoryFilters.map((filter) => (
                <button
                  key={filter.value || 'all'}
                  className={`filter-btn ${selectedCategoryId === filter.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategoryId(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="no-results">
            <p>Yükleniyor...</p>
          </div>
        ) : (
          <>
            <div className="gallery-detail-grid">
              {filteredProducts.map((product) => {
                const isFavorite = favoriteIds.includes(product.id);
                return (
                  <div key={product.id} className="gallery-detail-item">
                    {user && (
                      <button
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                        onClick={() => handleToggleFavorite(product.id)}
                        title={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                        aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                      >
                        <FontAwesomeIcon 
                          icon={isFavorite ? faHeart : faHeartRegular} 
                          className="favorite-icon"
                        />
                      </button>
                    )}
                    <div className="gallery-detail-image-container">
                      <img 
                        src={getProductImageUrl(product)} 
                        alt={product.name}
                        className="gallery-detail-image"
                      />
                    </div>
                    <div className="gallery-detail-content">
                      <h3 className="gallery-detail-item-title">{product.name}</h3>
                      <p className="gallery-detail-item-description">{product.description || ''}</p>
                      <div className="price-section">
                        <span className="price-label">Fiyat:</span>
                        <span className="price-value">₺{Number(product.price).toFixed(2)}</span>
                      </div>
                      {product.category && (
                        <div className="features-section">
                          <h4 className="features-title">Kategori:</h4>
                          <p className="feature-item">{product.category.name}</p>
                        </div>
                      )}
                      {user && (
                        <div className="product-actions">
                          {cart.find(item => item.productId === product.id) ? (
                            <div className="cart-controls">
                              <button 
                                onClick={() => updateCartQuantity(product.id, cart.find(item => item.productId === product.id)!.quantity - 1)}
                                className="quantity-btn"
                              >
                                -
                              </button>
                              <span className="quantity-value">{cart.find(item => item.productId === product.id)!.quantity}</span>
                              <button 
                                onClick={() => updateCartQuantity(product.id, cart.find(item => item.productId === product.id)!.quantity + 1)}
                                className="quantity-btn"
                              >
                                +
                              </button>
                              <button 
                                onClick={() => removeFromCart(product.id)}
                                className="remove-btn"
                              >
                                Kaldır
                              </button>
                            </div>
                          ) : (
                            <>
                              <button 
                                className="contact-btn buy-btn"
                                onClick={() => addToCart(product.id)}
                              >
                                Sepete Ekle
                              </button>
                              <button 
                                className="contact-btn buy-btn"
                                onClick={() => handleBuyClick(product)}
                              >
                                Hemen Al
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && !loading && (
              <div className="no-results">
                <p>Arama kriterlerinize uygun ürün bulunamadı.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Sepet Modal */}
      {showCart && (
        <div className="payment-modal-overlay" onClick={() => setShowCart(false)}>
          <div className="payment-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="payment-modal-title">Sepet</h2>
            {cart.length === 0 ? (
              <p>Sepetiniz boş</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => {
                    const product = products.find((p) => p.id === item.productId);
                    if (!product) return null;
                    return (
                      <div key={item.productId} className="cart-item">
                        <div className="cart-item-info">
                          <span>{product.name}</span>
                          <span>x{item.quantity}</span>
                        </div>
                        <div className="cart-item-price">
                          <span>₺{(Number(product.price) * item.quantity).toFixed(2)}</span>
                          <button 
                            onClick={() => removeFromCart(item.productId)}
                            className="remove-btn"
                          >
                            Kaldır
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="cart-total">
                  <strong>Toplam: ₺{getCartTotal().toFixed(2)}</strong>
                </div>
                <div className="payment-modal-actions">
                  <button 
                    onClick={() => setShowCart(false)}
                    className="cancel-btn"
                  >
                    Kapat
                  </button>
                  <button 
                    onClick={handleCartCheckout}
                    className="submit-btn"
                  >
                    Sipariş Ver
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Ödeme Modal */}
      {showPaymentModal && selectedProduct && (
        <div className="payment-modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="payment-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="payment-modal-title">Ödeme İşlemi</h2>
            
            <div className="order-summary">
              <h3>Sipariş Özeti</h3>
              <div className="summary-item">
                <span>Ürün:</span>
                <span>{selectedProduct.name}</span>
              </div>
              <div className="summary-item">
                <span>Fiyat:</span>
                <span>₺{Number(selectedProduct.price).toFixed(2)}</span>
              </div>
              <div className="summary-item">
                <span>Adet:</span>
                <div className="quantity-controls">
                  <button 
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="summary-item total">
                <span>Toplam:</span>
                <span className="total-price">
                  ₺{(Number(selectedProduct.price) * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            <form onSubmit={handlePaymentSubmit} className="payment-form">
              <h3>Kart Bilgileri</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Kart Numarası</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                    required
                    maxLength={19}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kart Üzerindeki İsim</label>
                  <input
                    type="text"
                    placeholder="Ad Soyad"
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Son Kullanma Tarihi</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                    required
                    maxLength={5}
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                    required
                    maxLength={3}
                  />
                </div>
              </div>

              <h3>Teslimat Bilgileri</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Adres</label>
                  <textarea
                    placeholder="Tam adres bilgisi"
                    value={paymentData.address}
                    onChange={(e) => setPaymentData({...paymentData, address: e.target.value})}
                    required
                    rows={3}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Şehir</label>
                  <input
                    type="text"
                    placeholder="Şehir"
                    value={paymentData.city}
                    onChange={(e) => setPaymentData({...paymentData, city: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Telefon</label>
                  <input
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    value={paymentData.phone}
                    onChange={(e) => setPaymentData({...paymentData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="payment-modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowPaymentModal(false)}
                  className="cancel-btn"
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="submit-btn"
                >
                  {isProcessing ? 'İşleniyor...' : 'Ödemeyi Tamamla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryDetail;
