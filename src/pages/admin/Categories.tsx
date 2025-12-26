import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriesService } from '../../services/categories.service';
import type { Category } from '../../services/categories.service';
import { useNotification } from '../../context/NotificationContext';
import { useConfirm } from '../../hooks/useConfirm';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import './Admin.css';

/**
 * Categories Component
 * Admin kullanıcılar için kategori yönetim sayfası
 * Kategorileri listeler, yeni kategori ekler, günceller ve siler
 */
const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const { success, error } = useNotification();
  const { confirm, confirmState, handleCancel } = useConfirm();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoriesService.getAll();
      setCategories(data);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoriesService.update(editingCategory.id, formData);
      } else {
        await categoriesService.create(formData);
      }
      setShowModal(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '' });
      success(editingCategory ? 'Kategori başarıyla güncellendi' : 'Kategori başarıyla eklendi');
      loadCategories();
    } catch (err: any) {
      error(err.response?.data?.message || 'İşlem başarısız');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description || '' });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: 'Kategori Sil',
      message: 'Bu kategoriyi silmek istediğinize emin misiniz?',
    });
    if (!confirmed) return;
    try {
      await categoriesService.delete(id);
      success('Kategori başarıyla silindi');
      loadCategories();
    } catch (err: any) {
      error(err.response?.data?.message || 'Silme işlemi başarısız');
    }
  };

  if (loading) return <div className="admin-container">Yükleniyor...</div>;

  return (
    <div className="admin-container">
      <Link to="/admin" className="admin-back-home">← Geri Git</Link>
      <div className="admin-header">
        <h1>Kategori Yönetimi</h1>
        <button onClick={() => {
          setEditingCategory(null);
          setFormData({ name: '', description: '' });
          setShowModal(true);
        }}>
          Yeni Kategori Ekle
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad</th>
            <th>Açıklama</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description || '-'}</td>
              <td>
                <button onClick={() => handleEdit(category)}>Düzenle</button>
                <button onClick={() => handleDelete(category.id)} className="delete-btn">
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
            <h2>{editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}</h2>
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
              <div className="modal-actions">
                <button type="submit">{editingCategory ? 'Güncelle' : 'Ekle'}</button>
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

export default Categories;

