import React, { useState, useEffect } from 'react';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header-visible' : 'header-hidden'}`}>
      <div className="header-container">
        <div className="logo">
          
        </div>
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#hakkimizda" className="nav-link">Hakkımızda</a>
            </li>
            <li className="nav-item">
              <a href="#galeri" className="nav-link">Galeri</a>
            </li>
            <li className="nav-item">
              <a href="#iletisim" className="nav-link">İletişim</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
