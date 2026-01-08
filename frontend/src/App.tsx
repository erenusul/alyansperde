import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import GalleryDetail from './components/GalleryDetail'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/admin/Dashboard'
import Categories from './pages/admin/Categories'
import AdminProducts from './pages/admin/Products'
import Orders from './pages/admin/Orders'
import Users from './pages/admin/Users'
import MyOrders from './pages/user/MyOrders'
import Products from './pages/user/Products'
import Favorites from './pages/user/Favorites'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
      <Route path="/" element={<Home />} />
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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="ADMIN">
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/categories" element={
        <ProtectedRoute requiredRole="ADMIN">
          <Categories />
        </ProtectedRoute>
      } />
      <Route path="/admin/products" element={
        <ProtectedRoute requiredRole="ADMIN">
          <AdminProducts />
        </ProtectedRoute>
      } />
      <Route path="/admin/orders" element={
        <ProtectedRoute requiredRole="ADMIN">
          <Orders />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute requiredRole="ADMIN">
          <Users />
        </ProtectedRoute>
      } />
      <Route path="/user/orders" element={
        <ProtectedRoute requiredRole="USER">
          <MyOrders />
        </ProtectedRoute>
      } />
      <Route path="/user/products" element={
        <ProtectedRoute requiredRole="USER">
          <Products />
        </ProtectedRoute>
      } />
      <Route path="/user/favorites" element={
        <ProtectedRoute requiredRole="USER">
          <Favorites />
        </ProtectedRoute>
      } />
      </Routes>
    </div>
  )
}

export default App
