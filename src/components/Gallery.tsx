import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';

interface CurtainType {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

const Gallery: React.FC = () => {
  const navigate = useNavigate();

  const curtainTypes: CurtainType[] = [
    {
      id: 1,
      name: "Klasik Perdeler",
      description: "Geleneksel tasarım ve kaliteli kumaşlarla üretilen klasik perdeler",
      image: "/perdeopt.png",
      category: "klasik"
    },
    {
      id: 2,
      name: "Modern Rollo Stor",
      description: "Pratik kullanım ve modern tasarımın buluştuğu rollo stor çözümleri",
      image: "/perdeopt.png",
      category: "modern"
    },
    {
      id: 3,
      name: "Blackout Perdeler",
      description: "Maksimum ışık kontrolü sağlayan blackout perdeler",
      image: "/perdeopt.png",
      category: "blackout"
    },
    {
      id: 4,
      name: "Dekoratif Tüller",
      description: "Şık ve hafif tül perdeler ile zarif dekorasyon",
      image: "/perdeopt.png",
      category: "tul"
    },
    {
      id: 5,
      name: "Zebra Stor",
      description: "Alternatif şeritli tasarımı ile öne çıkan zebra stor perdeler",
      image: "/perdeopt.png",
      category: "zebra"
    },
    {
      id: 6,
      name: "Pleatli Perdeler",
      description: "Düzenli kıvrımları ile şık görünüm sunan pleatli perdeler",
      image: "/perdeopt.png",
      category: "pleatli"
    }
  ];

  const handleDetailClick = (category: string) => {
    navigate(`/galeri?category=${category}`);
  };

  return (
    <section id="galeri" className="gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="gallery-title">PERDE ÇEŞİTLERİMİZ</h2>
          <div 
            className="view-all-btn"
            onClick={() => navigate('/galeri')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/galeri');
              }
            }}
          >
            Tüm Çeşitleri Gör
          </div>
        </div>
        
        <div className="gallery-grid">
          {curtainTypes.map((curtain) => (
            <div key={curtain.id} className="gallery-item">
              <div className="gallery-image-container">
                <img 
                  src={curtain.image} 
                  alt={curtain.name}
                  className="gallery-image"
                />
              </div>
              <div className="gallery-content">
                <h3 className="gallery-item-title">{curtain.name}</h3>
                <p className="gallery-item-description">{curtain.description}</p>
                        <button 
                          className="gallery-detail-btn"
                          onClick={() => handleDetailClick(curtain.category)}
                        >
                          Detayları Gör
                        </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
