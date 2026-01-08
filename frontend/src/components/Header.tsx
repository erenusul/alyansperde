import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true); // Ana sayfa dışında her zaman görünür
      return;
    }

    const handleScroll = () => {
      const aboutSection = document.getElementById('hakkimizda');
      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop;
        const scrollPosition = window.scrollY;
        
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-dropdown-wrapper')) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isUserDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleScrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: sectionId === 'iletisim' ? 'end' : 'start' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: sectionId === 'iletisim' ? 'end' : 'start' });
        }
      }, 100);
    }
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'header-visible' : 'header-hidden'}`}>
        <div className="header-container">
          <div className="mobile-menu-wrapper">
            <button 
              className="mobile-menu-toggle"
              onClick={handleMobileMenuClick}
              aria-label="Menu"
            >
              <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            {/* Mobile Dropdown Menu */}
            <div 
              className={`mobile-dropdown-menu ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={(e) => e.stopPropagation()}
            >
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {isHomePage ? (
              <>
                <li className="mobile-nav-item">
                  <a 
                    href="#hakkimizda" 
                    className="mobile-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollToSection('hakkimizda');
                    }}
                  >
                    Hakkımızda
                  </a>
                </li>
                <li className="mobile-nav-item">
                  <a 
                    href="#galeri" 
                    className="mobile-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollToSection('galeri');
                    }}
                  >
                    Galeri
                  </a>
                </li>
                <li className="mobile-nav-item">
                  <a 
                    href="#iletisim" 
                    className="mobile-nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollToSection('iletisim');
                    }}
                  >
                    İletişim
                  </a>
                </li>
              </>
            ) : (
              <li className="mobile-nav-item">
                <Link to="/" className="mobile-nav-link" onClick={handleMobileLinkClick}>
                  <FontAwesomeIcon icon={faHome} /> Ana Sayfa
                </Link>
              </li>
            )}
            {user ? (
              <>
                {user.role === 'ADMIN' && (
                  <li className="mobile-nav-item">
                    <Link to="/admin" className="mobile-nav-link" onClick={handleMobileLinkClick}>Admin</Link>
                  </li>
                )}
                {user.role === 'USER' && (
                  <>
                    <li className="mobile-nav-item">
                      <Link to="/galeri" className="mobile-nav-link" onClick={handleMobileLinkClick}>Ürünler</Link>
                    </li>
                    <li className="mobile-nav-item">
                      <Link to="/user/favorites" className="mobile-nav-link" onClick={handleMobileLinkClick}>Favorilerim</Link>
                    </li>
                    <li className="mobile-nav-item">
                      <Link to="/user/orders" className="mobile-nav-link" onClick={handleMobileLinkClick}>Siparişler</Link>
                    </li>
                  </>
                )}
                <li className="mobile-nav-item">
                  <span className="mobile-nav-link user-name">{user.name}</span>
                </li>
                <li className="mobile-nav-item">
                  <button onClick={handleLogout} className="mobile-nav-link logout-btn">Çıkış</button>
                </li>
              </>
            ) : (
              <>
                <li className="mobile-nav-item">
                  <Link to="/login" className="mobile-nav-link" onClick={handleMobileLinkClick}>Giriş</Link>
                </li>
                <li className="mobile-nav-item">
                  <Link to="/register" className="mobile-nav-link" onClick={handleMobileLinkClick}>Kayıt</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
            </div>
          </div>
          <div className="logo">
            {!isHomePage && (
              <Link to="/" className="home-link desktop-only">
                <FontAwesomeIcon icon={faHome} /> Ana Sayfa
              </Link>
            )}
            <img 
              src="/alyansperdegorselleroptimize/Alyans_Perde_Yazısı.png" 
              alt="ALYANS PERDE" 
              className="logo-image"
            />
          </div>
          <nav className="navigation desktop-nav">
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
                  <Link to="/" className="nav-link">
                    <FontAwesomeIcon icon={faHome} /> Ana Sayfa
                  </Link>
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
                        <Link to="/user/favorites" className="nav-link">Favorilerim</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/user/orders" className="nav-link">Siparişlerim</Link>
                      </li>
                    </>
                  )}
                  <li className="nav-item user-dropdown-wrapper">
                    <button 
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="nav-link user-name user-dropdown-toggle"
                    >
                      {user.name}
                    </button>
                    {isUserDropdownOpen && (
                      <div className="user-dropdown-menu">
                        <button 
                          onClick={handleLogout} 
                          className="user-dropdown-item logout-item"
                        >
                          Çıkış
                        </button>
                      </div>
                    )}
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
      
      {/* Mobile Dropdown Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown-overlay" onClick={handleMobileMenuClick}></div>
      )}
    </>
  );
};

export default Header;
