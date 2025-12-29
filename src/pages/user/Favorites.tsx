import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { favoritesService } from '../../services/favorites.service';
import type { Favorite } from '../../services/favorites.service';
import './User.css';

/**
 * Favorites Component
 * Kullanıcıların favori ürünlerini görüntülediği sayfa
 * Favorilerden ürün çıkarabilir ve ürün detaylarına bakabilir
 */
const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await favoritesService.getAll();
      setFavorites(data);
    } catch (error) {
      console.error('Favoriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (productId: number) => {
    if (!confirm('Bu ürünü favorilerden çıkarmak istediğinize emin misiniz?')) {
      return;
    }

    try {
      await favoritesService.remove(productId);
      setFavorites(favorites.filter((fav) => fav.product.id !== productId));
    } catch (error: any) {
      alert(error.response?.data?.message || 'Favoriden çıkarılırken hata oluştu');
    }
  };

  if (loading) return <div className="user-container">Yükleniyor...</div>;

  return (
    <div className="user-container">
      <Link to="/#galeri" className="back-to-home-btn">
        <FontAwesomeIcon icon={faHome} /> Ana Sayfa
      </Link>
      <div className="user-header">
        <h1>Favorilerim</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>Henüz favori ürününüz bulunmamaktadır.</p>
          <Link to="/galeri" className="back-to-home-btn" style={{ marginTop: '1rem' }}>
            Ürünleri Görüntüle
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="product-card">
              {favorite.product.imageUrl && (
                <img src={favorite.product.imageUrl} alt={favorite.product.name} />
              )}
              <h3>{favorite.product.name}</h3>
              <p>{favorite.product.description}</p>
              <div className="product-footer">
                <span className="price">{favorite.product.price} ₺</span>
                <button
                  onClick={() => handleRemoveFavorite(favorite.product.id)}
                  className="remove-btn"
                >
                  Favoriden Çıkar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

