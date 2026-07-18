import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Wishlist from './pages/Wishlist'
import Notice from './pages/Notice'
import NoticeDetail from './pages/NoticeDetail'
import SearchResult from './pages/SearchResult'
import NotFound from './pages/NotFound'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          {/* 수정: 카테고리 이름을 주소 파라미터로 받는 경로입니다. */}
          <Route path="/products/category/:category" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          {/* 수정: 헤더에서 전달한 검색어를 주소 파라미터로 받습니다. */}
          <Route path="/search/:keyword" element={<SearchResult />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
