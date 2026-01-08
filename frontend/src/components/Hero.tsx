import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-image-container">
        <img 
          src="/perdeopt.png" 
          alt="ALYANS PERDE" 
          className="hero-image"
        />
      </div>
      <div className="hero-content">
        <img 
          src="/alyansperdegorselleroptimize/Alyans_Perde_Yazısı.png" 
          alt="ALYANS PERDE" 
          className={`hero-title ${showText ? 'loaded' : ''}`}
        />
      </div>
    </section>
  );
};

export default Hero;
