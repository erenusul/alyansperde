import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import GalleryDetail from './components/GalleryDetail'
import Footer from './components/Footer'
import ContactButtons from './components/ContactButtons'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <ContactButtons />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Gallery />
            <Footer />
          </>
        } />
        <Route path="/galeri/:category" element={<GalleryDetail />} />
        <Route path="/galeri" element={<GalleryDetail />} />
      </Routes>
    </div>
  )
}

export default App
