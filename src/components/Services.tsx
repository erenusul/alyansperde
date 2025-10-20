import React, { useState, useEffect } from 'react';
import './Services.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faWandMagicSparkles, faDiagramProject, faUsersGear, faScrewdriverWrench, faHeadset } from '@fortawesome/free-solid-svg-icons';

const Services: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const servicesSection = document.getElementById('hizmetlerimiz');
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Section'ın %50'si görünür olduğunda animasyonu başlat
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
          setIsVisible(true);
          // Başlık geldikten 0.5 saniye sonra servisleri göster
          setTimeout(() => {
            setShowServices(true);
          }, 500);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // İlk yüklemede kontrol et
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <section id="hizmetlerimiz" className="services">
      <div className="services-container">
        <div className="services-content">
          <div className={`services-logo-section ${isVisible ? 'animate-in' : ''}`}>
            <div className="logo">HİZMETLERİMİZ</div>
            <div className={`services-list ${showServices ? 'animate-in' : ''}`}>
              <div className="services-left">
                <span className="service-item">
                  <FontAwesomeIcon icon={faUsersGear} />
                  MONTAJ
                </span>
                <span className="service-item">
                  <FontAwesomeIcon icon={faDiagramProject} />
                  PLANLAMA
                </span>
                <span className="service-item">
                  <FontAwesomeIcon icon={faWandMagicSparkles} />
                  TASARIM
                </span>
              </div>
              <div className="services-right">
                <span className="service-item">
                  <span>SEÇİM</span>
                  <FontAwesomeIcon icon={faSquareCheck} />
                </span>
                <span className="service-item">
                  ARIZA TAMİR
                  <FontAwesomeIcon icon={faScrewdriverWrench} />
                </span>
                <span className="service-item">
                  SATIŞ SONRASI DESTEK
                  <FontAwesomeIcon icon={faHeadset} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
