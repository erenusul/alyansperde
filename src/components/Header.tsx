import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Sadece ana sayfada scroll ile header'ı gizle/göster
    if (!isHomePage) {
      setIsScrolled(true); // Ana sayfa dışında her zaman görünür
      return;
    }

    const handleScroll = () => {
      const aboutSection = document.getElementById('hakkimizda');
      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop;
        const scrollPosition = window.scrollY;
        
        // About kısmına gelince header'ı göster
        if (scrollPosition >= aboutTop - 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`header ${isScrolled ? 'header-visible' : 'header-hidden'}`}>
      <div className="header-container">
        <div className="logo">
          {!isHomePage && (
            <Link to="/" className="home-link">
              ← Ana Sayfa
            </Link>
          )}
        </div>
        <nav className="navigation">
          <ul className="nav-list">
            {isHomePage ? (
              <>
                <li className="nav-item">
                  <a 
                    href="#hakkimizda" 
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isHomePage) {
                        const aboutSection = document.getElementById('hakkimizda');
                        if (aboutSection) {
                          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      } else {
                        navigate('/');
                        setTimeout(() => {
                          const aboutSection = document.getElementById('hakkimizda');
                          if (aboutSection) {
                            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 100);
                      }
                    }}
                  >
                    Hakkımızda
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    href="#galeri" 
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isHomePage) {
                        const gallerySection = document.getElementById('galeri');
                        if (gallerySection) {
                          gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      } else {
                        navigate('/');
                        setTimeout(() => {
                          const gallerySection = document.getElementById('galeri');
                          if (gallerySection) {
                            gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }, 100);
                      }
                    }}
                  >
                    Galeri
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    href="#iletisim" 
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isHomePage) {
                        const footer = document.getElementById('iletisim');
                        if (footer) {
                          footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
                        }
                      } else {
                        navigate('/');
                        setTimeout(() => {
                          const footer = document.getElementById('iletisim');
                          if (footer) {
                            footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
                          }
                        }, 100);
                      }
                    }}
                  >
                    İletişim
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/" className="nav-link">Ana Sayfa</Link>
              </li>
            )}
            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link">Admin</Link>
                  </li>
                )}
                {user.role === 'USER' && (
                  <>
                    <li className="nav-item">
                      <Link to="/galeri" className="nav-link">Ürünler</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/user/orders" className="nav-link">Siparişlerim</Link>
                    </li>
                  </>
                )}
                <li className="nav-item">
                  <span className="nav-link user-name">{user.name}</span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link logout-btn">Çıkış</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Giriş</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Kayıt</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
