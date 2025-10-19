import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="hakkimizda" className="about">
      <div className="about-container">
        <div className="about-content">
          <h2 className="about-title">HAKKIMIZDA</h2>
          <div className="about-text">
            <p>
              Alyans Perde olarak, 1995 yılından beri ev ve ofis dekorasyonunda kaliteli perde ve stor çözümleri sunmaktayız. 
              Müşteri memnuniyetini ön planda tutarak, modern tasarım anlayışı ile geleneksel kaliteyi harmanlayan ürünlerimizle 
              yaşam alanlarınızı güzelleştiriyoruz.
            </p>
            <p>
              Geniş ürün yelpazemizde klasik perdelerden modern rollo storlara, blackout perdelerden dekoratif tüllerimize kadar 
              her ihtiyaca uygun çözümler bulabilirsiniz. Uzman ekibimiz, ölçümden montaja kadar tüm süreçte size rehberlik eder.
            </p>
            <p>
              Kaliteli kumaşlar, özenli işçilik ve uygun fiyat politikamızla, perde ihtiyaçlarınızı en iyi şekilde karşılıyoruz. 
              Müşterilerimizin evlerinde yarattığımız güzellik ve konfor, bizim en büyük motivasyonumuzdur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
