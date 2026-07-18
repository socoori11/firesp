import React from 'react'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>Fire Shopping</Link>

        {/* 수정: 헤더는 검색 기능을 직접 처리하지 않고 SearchBox를 사용합니다. */}
        <SearchBox />

        <nav className={styles.userMenu} aria-label="사용자 메뉴">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
          <Link to="/wishlist">찜</Link>
          <Link to="/cart">장바구니</Link>
        </nav>
      </div>

      <nav className={styles.mainMenu} aria-label="주요 메뉴">
        <Link to="/products">전체 상품</Link>
        <Link to="/products/category/keyboard">키보드</Link>
        <Link to="/products/category/mouse">마우스</Link>
        <Link to="/products/category/monitor">모니터</Link>
        <Link to="/notice">공지사항</Link>
      </nav>
    </header>
  )
}

export default Header
