import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import './Admin.css';

/**
 * Admin Dashboard Component
 * Admin kullanıcılar için ana kontrol paneli sayfası
 * Kategoriler, ürünler, siparişler ve kullanıcılar için hızlı erişim linkleri sağlar
 */
const Dashboard: React.FC = () => {
  return (
    <div className="admin-container">
      <Link to="/" className="admin-back-home">
        <FontAwesomeIcon icon={faHome} /> Ana Sayfa
      </Link>
      <div className="admin-header">
        <h1>Admin Paneli</h1>
      </div>
      <div className="admin-grid">
        <Link to="/admin/categories" className="admin-card">
          <h2>Kategoriler</h2>
          <p>Kategori yönetimi</p>
        </Link>
        <Link to="/admin/products" className="admin-card">
          <h2>Ürünler</h2>
          <p>Ürün yönetimi</p>
        </Link>
        <Link to="/admin/orders" className="admin-card">
          <h2>Siparişler</h2>
          <p>Sipariş yönetimi ve durum güncellemeleri</p>
        </Link>
        <Link to="/admin/users" className="admin-card">
          <h2>Kullanıcılar</h2>
          <p>Kullanıcı yönetimi ve silme işlemleri</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

