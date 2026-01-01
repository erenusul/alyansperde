import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer id="iletisim" className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <img 
              src="/alyansperdegorselleroptimize/Alyans_Perde_Yazısı.png" 
              alt="ALYANS PERDE" 
              className="footer-logo"
            />
          </div>
          
          
          <div className="footer-section">
            <h4 className="footer-subtitle">İletişim</h4>
            <div className="contact-info">
              <p className="contact-item">
                
              •   0555 123 45 67
              </p>
           
              <p className="contact-item">
                
              • Denizli, Türkiye
              </p>
              
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Sosyal Medya</h4>
            <div className="social-links">
              <a href="https://www.instagram.com/alyansperdedenizli/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
                <span className="social-text">Instagram<br/><span className="account-name">@alyansperdedenizli</span></span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 Alyans Perde. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
