import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { productsService } from '../../services/products.service';
import type { Product } from '../../services/products.service';
import { categoriesService } from '../../services/categories.service';
import type { Category } from '../../services/categories.service';
import { ordersService } from '../../services/orders.service';
import { favoritesService } from '../../services/favorites.service';
import { useAuth } from '../../context/AuthContext';
import './User.css';

/**
 * Products Component (User View)
 * Kullanıcılar için ürün listesi ve sipariş verme sayfası
 * Ürünleri kategorilere göre filtreleyebilir ve sipariş oluşturabilir
 */
const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Array<{ productId: number; quantity: number }>>([]);
  const [showCart, setShowCart] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    loadData();
    if (user) {
      loadFavorites();
    }
  }, [user]);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadFavorites = async () => {
    try {
      const ids = await favoritesService.getFavoriteIds();
      setFavoriteIds(ids);
    } catch (error) {
      console.error('Favoriler yüklenirken hata:', error);
    }
  };

  const loadData = async () => {
    try {
      const categoriesData = await categoriesService.getAll();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = selectedCategory
        ? await productsService.getAll(selectedCategory)
        : await productsService.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (productId: number) => {
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

  const updateQuantity = (productId: number, quantity: number) => {
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

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Sepetiniz boş!');
      return;
    }

    try {
      await ordersService.create({ items: cart });
      setCart([]);
      setShowCart(false);
      alert('Siparişiniz başarıyla oluşturuldu!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Sipariş oluşturulurken hata oluştu');
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product ? Number(product.price) * item.quantity : 0);
    }, 0);
  };

  const handleToggleFavorite = async (productId: number) => {
    if (!user) {
      alert('Favorilere eklemek için giriş yapmalısınız');
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

  if (loading) return <div className="user-container">Yükleniyor...</div>;

  return (
    <div className="user-container">
      <Link to="/#galeri" className="back-to-home-btn">
        <FontAwesomeIcon icon={faHome} /> Ana Sayfa
      </Link>
      <div className="user-header">
        <h1>Ürünler</h1>
        <button onClick={() => setShowCart(true)} className="cart-button">
          Sepet ({cart.length})
        </button>
      </div>

      <div className="filter-section">
        <button
          onClick={() => setSelectedCategory(null)}
          className={selectedCategory === null ? 'active' : ''}
        >
          Tümü
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? 'active' : ''}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {products.map((product) => {
          const cartItem = cart.find((item) => item.productId === product.id);
          const isFavorite = favoriteIds.includes(product.id);
          return (
            <div key={product.id} className="product-card">
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
              <img src={getProductImageUrl(product)} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-footer">
                <span className="price">{product.price} ₺</span>
                {cartItem ? (
                  <div className="cart-controls">
                    <button onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}>
                      -
                    </button>
                    <span>{cartItem.quantity}</span>
                    <button onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}>
                      +
                    </button>
                    <button onClick={() => removeFromCart(product.id)} className="remove-btn">
                      Kaldır
                    </button>
                  </div>
                ) : (
                  <button onClick={() => addToCart(product.id)}>Sepete Ekle</button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Sepet</h2>
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
                        <span>{product.name} x{item.quantity}</span>
                        <span>{Number(product.price) * item.quantity} ₺</span>
                      </div>
                    );
                  })}
                </div>
                <div className="cart-total">
                  <strong>Toplam: {getCartTotal().toFixed(2)} ₺</strong>
                </div>
                <div className="modal-actions">
                  <button onClick={handleCheckout}>Sipariş Ver</button>
                  <button onClick={() => setShowCart(false)}>Kapat</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

