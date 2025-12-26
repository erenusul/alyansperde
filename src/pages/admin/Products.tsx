import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsService } from '../../services/products.service';
import type { Product } from '../../services/products.service';
import { categoriesService } from '../../services/categories.service';
import type { Category } from '../../services/categories.service';
import { useNotification } from '../../context/NotificationContext';
import { useConfirm } from '../../hooks/useConfirm';
import { ConfirmDialog } from '../../components/ConfirmDialog';
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
  const { success, error } = useNotification();
  const { confirm, confirmState, handleCancel } = useConfirm();

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
      success(editingProduct ? 'Ürün başarıyla güncellendi' : 'Ürün başarıyla eklendi');
      loadData();
    } catch (err: any) {
      error(err.response?.data?.message || 'İşlem başarısız');
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
    const confirmed = await confirm({
      title: 'Ürün Sil',
      message: 'Bu ürünü silmek istediğinize emin misiniz?',
    });
    if (!confirmed) return;
    try {
      await productsService.delete(id);
      success('Ürün başarıyla silindi');
      loadData();
    } catch (err: any) {
      error(err.response?.data?.message || 'Silme işlemi başarısız');
    }
  };

  if (loading) return <div className="admin-container">Yükleniyor...</div>;

  return (
    <div className="admin-container">
      <Link to="/admin" className="admin-back-home">← Geri Git</Link>
      <div className="admin-header">
        <h1>Ürün Yönetimi</h1>
        <button onClick={() => {
          setEditingProduct(null);
          setFormData({ name: '', description: '', price: '', imageUrl: '', categoryId: '' });
          setShowModal(true);
        }}>
          Yeni Ürün Ekle
        </button>
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
                  src={product.imageUrl || '/perdeopt.png'} 
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
      {confirmState && (
        <ConfirmDialog
          isOpen={confirmState.isOpen}
          title={confirmState.title}
          message={confirmState.message}
          confirmText={confirmState.confirmText}
          cancelText={confirmState.cancelText}
          onConfirm={confirmState.onConfirm}
          onCancel={confirmState.onCancel}
        />
      )}
    </div>
  );
};

export default Products;

