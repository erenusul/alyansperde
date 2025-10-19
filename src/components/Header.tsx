import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
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
