import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Text appears after 2 seconds
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
        <h1 className={`hero-title ${showText ? 'loaded' : ''}`}>
          ALYANS PERDE
        </h1>
      </div>
    </section>
  );
};

export default Hero;
