import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Gallery from './Gallery';
import Footer from './Footer';
import ContactButtons from './ContactButtons';

const Home: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Hash ile yönlendirme yapıldığında ilgili bölüme scroll yap
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      // Hash yoksa en üste scroll yap
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <>
      <Header />
      <ContactButtons />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Footer />
    </>
  );
};

export default Home;

