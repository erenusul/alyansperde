import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import GalleryDetail from './components/GalleryDetail'
import Footer from './components/Footer'
import ContactButtons from './components/ContactButtons'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <ContactButtons />
            <Hero />
            <About />
            <Services />
            <Gallery />
            <Footer />
          </>
        } />
        <Route path="/galeri/:category" element={
          <>
            <GalleryDetail />
            <Footer />
          </>
        } />
        <Route path="/galeri" element={
          <>
            <GalleryDetail />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
