import React, { useEffect, useState } from 'react'
import MainBanner from '../components/MainBanner'
import CategoryMenu from '../components/CategoryMenu'
import ProductList from '../components/ProductList'
import styles from './Home.module.scss'

const Home = () => {
  // 수정: 관리자 추천 기능 없이 홈에 표시할 상품을 저장합니다.
  const [homeProducts, setHomeProducts] = useState([])

  // 수정: products.json의 앞쪽 상품 4개를 임의로 선택합니다.
  useEffect(() => {
    const loadHomeProducts = async () => {
      const response = await fetch('/data/products.json')
      const productData = await response.json()
      const firstFourProducts = productData.slice(0, 4)
      setHomeProducts(firstFourProducts)
    }

    loadHomeProducts()
  }, [])

  return (
    <div className={styles.home}>
      <MainBanner />
      <CategoryMenu />
      <section className={styles.recommendSection}>
        <h2>추천 상품</h2>
        <ProductList products={homeProducts} />
      </section>
    </div>
  )
}

export default Home
