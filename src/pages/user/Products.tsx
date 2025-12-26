import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { productsService } from '../../services/products.service';
import type { Product } from '../../services/products.service';
import { categoriesService } from '../../services/categories.service';
import type { Category } from '../../services/categories.service';
import { ordersService } from '../../services/orders.service';
import { useNotification } from '../../context/NotificationContext';
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
  const { success, error, warning } = useNotification();

  const loadData = useCallback(async () => {
    try {
      const categoriesData = await categoriesService.getAll();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata:', error);
    }
  }, []);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productsService.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    loadProducts();
  }, [loadData, loadProducts]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === null) {
      return products;
    }
    return products.filter(product => product.categoryId === selectedCategory);
  }, [products, selectedCategory]);

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
      warning('Sepetiniz boş!');
      return;
    }

    try {
      await ordersService.create({ items: cart });
      setCart([]);
      setShowCart(false);
      success('Siparişiniz başarıyla oluşturuldu!');
    } catch (err: any) {
      error(err.response?.data?.message || 'Sipariş oluşturulurken hata oluştu');
    }
  };

  const getCartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product ? Number(product.price) * item.quantity : 0);
    }, 0);
  }, [cart, products]);

  if (loading) return <div className="user-container">Yükleniyor...</div>;

  return (
    <div className="user-container">
      <Link to="/#galeri" className="back-to-home-btn">← Ana Sayfa</Link>
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
        {filteredProducts.map((product) => {
          const cartItem = cart.find((item) => item.productId === product.id);
          return (
            <div key={product.id} className="product-card">
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} />
              )}
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
                  <strong>Toplam: {getCartTotal.toFixed(2)} ₺</strong>
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

