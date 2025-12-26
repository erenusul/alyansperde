import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersService } from '../../services/orders.service';
import type { Order } from '../../services/orders.service';
import './Admin.css';

/**
 * Orders Component
 * Admin kullanıcılar için sipariş yönetim sayfası
 * Tüm siparişleri listeler, sipariş durumlarını günceller ve siparişleri silebilir
 */
const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await ordersService.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Siparişler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: number, status: Order['status']) => {
    try {
      await ordersService.update(id, { status });
      loadOrders();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Güncelleme başarısız');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bu siparişi silmek istediğinize emin misiniz?')) return;
    try {
      await ordersService.delete(id);
      loadOrders();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Silme işlemi başarısız');
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return '#ff9800';
      case 'PROCESSING':
        return '#2196f3';
      case 'COMPLETED':
        return '#4caf50';
      case 'CANCELLED':
        return '#f44336';
      default:
        return '#666';
    }
  };

  if (loading) return <div className="admin-container">Yükleniyor...</div>;

  return (
    <div className="admin-container">
      <Link to="/admin" className="admin-back-home">← Geri Git</Link>
      <div className="admin-header">
        <h1>Sipariş Yönetimi</h1>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı</th>
            <th>Ürünler</th>
            <th>Toplam</th>
            <th>Durum</th>
            <th>Tarih</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user?.name || order.user?.email || '-'}</td>
              <td>
                {order.orderItems.map((item) => (
                  <div key={item.id}>
                    {item.product?.name} x{item.quantity}
                  </div>
                ))}
              </td>
              <td>{order.totalPrice} ₺</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                  style={{ backgroundColor: getStatusColor(order.status), color: 'white', border: 'none', padding: '5px', borderRadius: '3px' }}
                >
                  <option value="PENDING">Beklemede</option>
                  <option value="PROCESSING">İşleniyor</option>
                  <option value="COMPLETED">Tamamlandı</option>
                  <option value="CANCELLED">İptal</option>
                </select>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString('tr-TR')}</td>
              <td>
                <button onClick={() => handleDelete(order.id)} className="delete-btn">
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

