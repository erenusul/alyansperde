import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsService } from '../../services/products.service';
import type { Product } from '../../services/products.service';
import { categoriesService } from '../../services/categories.service';
import type { Category } from '../../services/categories.service';
import './Admin.css';

/**
 * Products Component
 * Admin kullanıcılar için ürün yönetim sayfası
 * Ürünleri listeler, yeni ürün ekler, günceller ve siler
 */
const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    categoryId: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productsService.getAll(),
        categoriesService.getAll(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Veriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        categoryId: parseInt(formData.categoryId),
      };
      if (editingProduct) {
        await productsService.update(editingProduct.id, data);
      } else {
        await productsService.create(data);
      }
      setShowModal(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', imageUrl: '', categoryId: '' });
      loadData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'İşlem başarısız');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      imageUrl: product.imageUrl || '',
      categoryId: product.categoryId.toString(),
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    try {
      await productsService.delete(id);
      loadData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Silme işlemi başarısız');
    }
  };

  const handleUpdateAllImages = async () => {
    if (!confirm('Tüm ürünlerin görsellerini kategorilerine göre güncellemek istediğinize emin misiniz?')) return;
    try {
      const result = await productsService.updateAllImages();
      alert(result.message);
      loadData();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Görsel güncelleme başarısız');
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

  if (loading) return <div className="admin-container">Yükleniyor...</div>;

  return (
    <div className="admin-container">
      <Link to="/admin" className="admin-back-home">← Geri Git</Link>
      <div className="admin-header">
        <h1>Ürün Yönetimi</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleUpdateAllImages} style={{ backgroundColor: '#28a745' }}>
            Tüm Görselleri Güncelle
          </button>
          <button onClick={() => {
            setEditingProduct(null);
            setFormData({ name: '', description: '', price: '', imageUrl: '', categoryId: '' });
            setShowModal(true);
          }}>
            Yeni Ürün Ekle
          </button>
        </div>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Görsel</th>
            <th>Ad</th>
            <th>Kategori</th>
            <th>Fiyat</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img 
                  src={getProductImageUrl(product)} 
                  alt={product.name}
                  className="admin-product-image"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category?.name || '-'}</td>
              <td>{product.price} ₺</td>
              <td>
                <button onClick={() => handleEdit(product)}>Düzenle</button>
                <button onClick={() => handleDelete(product.id)} className="delete-btn">
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingProduct ? 'Ürün Düzenle' : 'Yeni Ürün Ekle'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ad</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Açıklama</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Fiyat</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Resim URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Kategori</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                >
                  <option value="">Seçiniz</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit">{editingProduct ? 'Güncelle' : 'Ekle'}</button>
                <button type="button" onClick={() => setShowModal(false)}>İptal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

