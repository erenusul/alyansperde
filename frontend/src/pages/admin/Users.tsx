import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usersService } from '../../services/users.service';
import type { User } from '../../services/users.service';
import './Admin.css';

/**
 * Users Component
 * Admin kullanıcılar için kullanıcı yönetim sayfası
 * Kullanıcıları listeler ve silme işlemleri yapar
 */
const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await usersService.getAll();
      setUsers(usersData);
    } catch (error) {
      console.error('Kullanıcılar yüklenirken hata:', error);
      alert('Kullanıcılar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, userName: string) => {
    if (!confirm(`${userName} adlı kullanıcıyı silmek istediğinize emin misiniz?`)) {
      return;
    }

    try {
      await usersService.delete(id);
      await loadUsers();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Silme işlemi başarısız';
      alert(errorMessage);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRoleLabel = (role: string): string => {
    return role === 'ADMIN' ? 'Admin' : 'Kullanıcı';
  };

  if (loading) {
    return <div className="admin-container">Yükleniyor...</div>;
  }

  return (
    <div className="admin-container">
      <Link to="/admin" className="admin-back-home">← Geri Git</Link>
      <div className="admin-header">
        <h1>Kullanıcı Yönetimi</h1>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>İsim</th>
            <th>Rol</th>
            <th>Kayıt Tarihi</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                Henüz kullanıcı bulunmamaktadır.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{getRoleLabel(user.role)}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    className="delete-btn"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
