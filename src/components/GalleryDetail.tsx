import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import './GalleryDetail.css';

interface CurtainDetail {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  price: string;
  features: string[];
}

const GalleryDetail: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Sayfa yüklendiğinde en üste scroll yap
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // URL'den category parametresini oku
    const urlCategory = searchParams.get('category') || category || 'all';
    setSelectedCategory(urlCategory);
  }, [searchParams, category]);

  const curtainDetails: CurtainDetail[] = [
    // Klasik Perdeler
    {
      id: 1,
      name: "Klasik Kadife Perde",
      description: "Lüks kadife kumaştan üretilen, geleneksel tasarımlı klasik perde",
      image: "/perdeopt.png",
      category: "klasik",
      price: "₺150-300",
      features: ["Kadife kumaş", "Geleneksel tasarım", "Işık kontrolü", "Kolay temizlik"]
    },
    {
      id: 2,
      name: "Klasik Pamuklu Perde",
      description: "Doğal pamuk kumaştan üretilen, nefes alabilir klasik perde",
      image: "/perdeopt.png",
      category: "klasik",
      price: "₺100-200",
      features: ["Doğal pamuk", "Nefes alabilir", "Yıkanabilir", "Ekolojik"]
    },
    // Modern Rollo Stor
    {
      id: 3,
      name: "Modern Rollo Stor",
      description: "Pratik kullanım ve modern tasarımın buluştuğu rollo stor",
      image: "/perdeopt.png",
      category: "modern",
      price: "₺80-150",
      features: ["Pratik kullanım", "Modern tasarım", "Kolay montaj", "Uzun ömürlü"]
    },
    {
      id: 4,
      name: "Motorlu Rollo Stor",
      description: "Uzaktan kumandalı, otomatik açılıp kapanan motorlu rollo stor",
      image: "/perdeopt.png",
      category: "modern",
      price: "₺200-400",
      features: ["Uzaktan kumanda", "Otomatik sistem", "Sessiz çalışma", "Güvenli"]
    },
    // Blackout Perdeler
    {
      id: 5,
      name: "Blackout Perde",
      description: "Maksimum ışık kontrolü sağlayan, tamamen karanlık ortam yaratan perde",
      image: "/perdeopt.png",
      category: "blackout",
      price: "₺120-250",
      features: ["%100 ışık blokajı", "Ses yalıtımı", "Enerji tasarrufu", "Kaliteli kumaş"]
    },
    {
      id: 6,
      name: "Blackout Rollo",
      description: "Pratik kullanımlı, maksimum ışık kontrolü sağlayan blackout rollo",
      image: "/perdeopt.png",
      category: "blackout",
      price: "₺100-200",
      features: ["%100 ışık blokajı", "Pratik kullanım", "Kolay temizlik", "Modern görünüm"]
    },
    // Dekoratif Tüller
    {
      id: 7,
      name: "Dekoratif Tül",
      description: "Şık ve hafif tül perde ile zarif dekorasyon",
      image: "/perdeopt.png",
      category: "tul",
      price: "₺50-120",
      features: ["Hafif kumaş", "Zarif görünüm", "Işık geçirgen", "Kolay bakım"]
    },
    {
      id: 8,
      name: "İşlemeli Tül",
      description: "Özel işlemeli desenli, dekoratif tül perde",
      image: "/perdeopt.png",
      category: "tul",
      price: "₺80-150",
      features: ["Özel işleme", "Dekoratif desen", "Kaliteli kumaş", "Şık görünüm"]
    },
    // Zebra Stor
    {
      id: 9,
      name: "Zebra Stor",
      description: "Alternatif şeritli tasarımı ile öne çıkan zebra stor perde",
      image: "/perdeopt.png",
      category: "zebra",
      price: "₺90-180",
      features: ["Alternatif şerit", "Modern tasarım", "Işık kontrolü", "Pratik kullanım"]
    },
    {
      id: 10,
      name: "Zebra Blackout",
      description: "Zebra desenli, ışık blokajı sağlayan özel stor",
      image: "/perdeopt.png",
      category: "zebra",
      price: "₺120-220",
      features: ["Zebra desen", "Işık blokajı", "Modern görünüm", "Kaliteli malzeme"]
    },
    // Pleatli Perdeler
    {
      id: 11,
      name: "Pleatli Perde",
      description: "Düzenli kıvrımları ile şık görünüm sunan pleatli perde",
      image: "/perdeopt.png",
      category: "pleatli",
      price: "₺110-220",
      features: ["Düzenli kıvrım", "Şık görünüm", "Kaliteli kumaş", "Kolay kullanım"]
    },
    {
      id: 12,
      name: "Pleatli Stor",
      description: "Pleatli tasarımlı, modern stor perde çözümü",
      image: "/perdeopt.png",
      category: "pleatli",
      price: "₺100-190",
      features: ["Pleatli tasarım", "Modern görünüm", "Pratik kullanım", "Uzun ömürlü"]
    }
  ];

  const filteredCurtains = curtainDetails.filter(curtain => {
    const matchesCategory = selectedCategory === 'all' || curtain.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      curtain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curtain.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryNames: { [key: string]: string } = {
    'klasik': 'Klasik Perdeler',
    'modern': 'Modern Rollo Stor',
    'blackout': 'Blackout Perdeler',
    'tul': 'Dekoratif Tüller',
    'zebra': 'Zebra Stor',
    'pleatli': 'Pleatli Perdeler'
  };

  const categoryFilters = [
    { value: 'all', label: 'Tüm Kategoriler' },
    { value: 'klasik', label: 'Klasik Perdeler' },
    { value: 'modern', label: 'Modern Rollo Stor' },
    { value: 'blackout', label: 'Blackout Perdeler' },
    { value: 'tul', label: 'Dekoratif Tüller' },
    { value: 'zebra', label: 'Zebra Stor' },
    { value: 'pleatli', label: 'Pleatli Perdeler' }
  ];


  return (
    <div className="gallery-detail">
      <div className="gallery-detail-container">
        <div className="gallery-detail-header">
          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            ← Ana Sayfaya Dön
          </button>
          <h1 className="gallery-detail-title">
            TÜM PERDE ÇEŞİTLERİ
          </h1>
         
        </div>

        <div className="filter-section">
          <h3 className="filter-title">Arama</h3>
          <div className="search-container">
            <input
              type="text"
              placeholder="Perde adı veya açıklama ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <h3 className="filter-title">Kategoriye Göre Filtrele</h3>
          <div className="filter-buttons">
            {categoryFilters.map((filter) => (
              <button
                key={filter.value}
                className={`filter-btn ${selectedCategory === filter.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-detail-grid">
          {filteredCurtains.map((curtain) => (
            <div key={curtain.id} className="gallery-detail-item">
              <div className="gallery-detail-image-container">
                <img 
                  src={curtain.image} 
                  alt={curtain.name}
                  className="gallery-detail-image"
                />
              </div>
              <div className="gallery-detail-content">
                <h3 className="gallery-detail-item-title">{curtain.name}</h3>
                <p className="gallery-detail-item-description">{curtain.description}</p>
                <div className="price-section">
                  <span className="price-label">Fiyat:</span>
                  <span className="price-value">{curtain.price}</span>
                </div>
                <div className="features-section">
                  <h4 className="features-title">Özellikler:</h4>
                  <ul className="features-list">
                    {curtain.features.map((feature, index) => (
                      <li key={index} className="feature-item">{feature}</li>
                    ))}
                  </ul>
                </div>
                <button className="contact-btn">
                  Bilgi Al
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCurtains.length === 0 && (
          <div className="no-results">
            <p>Arama kriterlerinize uygun ürün bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryDetail;
