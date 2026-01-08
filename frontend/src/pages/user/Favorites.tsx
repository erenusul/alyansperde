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

  const getProductImageUrl = (product: Favorite['product']): string => {
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
              <img src={getProductImageUrl(favorite.product)} alt={favorite.product.name} />
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

