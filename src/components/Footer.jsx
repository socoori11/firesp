import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <strong>Fire Shopping</strong>
          <p>좋은 상품을 편리하게 만나는 온라인 쇼핑몰</p>
        </div>

        <nav className={styles.menu} aria-label="하단 메뉴">
          <Link to="/products">전체 상품</Link>
          <Link to="/notice">공지사항</Link>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </nav>

        <address className={styles.info}>
          <span>대표: 홍길동</span>
          <span>사업자등록번호: 000-00-00000</span>
          <span>고객센터: 02-0000-0000</span>
          <span>이메일: help@fireshopping.com</span>
        </address>

        <p className={styles.copyright}>
          © {new Date().getFullYear()} Fire Shopping. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
