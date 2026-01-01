import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { ordersService } from '../../services/orders.service';
import type { Order } from '../../services/orders.service';
import './User.css';

/**
 * MyOrders Component
 * Kullanıcıların kendi siparişlerini görüntülediği sayfa
 * Sipariş detaylarını ve durumlarını gösterir
 */
const MyOrders: React.FC = () => {
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

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return 'Beklemede';
      case 'PROCESSING':
        return 'İşleniyor';
      case 'COMPLETED':
        return 'Tamamlandı';
      case 'CANCELLED':
        return 'İptal';
      default:
        return status;
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

  if (loading) return <div className="user-container">Yükleniyor...</div>;

  return (
    <div className="user-container">
      <Link to="/#galeri" className="back-to-home-btn">
        <FontAwesomeIcon icon={faHome} /> Ana Sayfa
      </Link>
      <div className="user-header">
        <h1>Siparişlerim</h1>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>Henüz siparişiniz bulunmamaktadır.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">Sipariş #{order.id}</span>
                <span
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
              <div className="order-items">
                <h3>Ürünler:</h3>
                {order.orderItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <span>
                      {item.product?.name || 'Ürün'} x{item.quantity}
                    </span>
                    <span>
                      {item.product
                        ? (Number(item.product.price) * item.quantity).toFixed(2)
                        : '0.00'}{' '}
                      ₺
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <span className="order-date">
                  Tarih: {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                </span>
                <span className="order-total">
                  <strong>Toplam: {order.totalPrice} ₺</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

