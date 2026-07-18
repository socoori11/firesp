import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductList from '../components/ProductList'
import styles from './Products.module.scss'

const categoryNames = {
  keyboard: '키보드',
  mouse: '마우스',
  monitor: '모니터',
  laptop: '노트북',
  speaker: '스피커',
  accessory: '액세서리',
}

const Products = () => {
  const { category } = useParams()

  // 수정: JSX에 있던 상품 데이터 대신 JSON 데이터를 저장합니다.
  const [products, setProducts] = useState([])

  // 수정: products.json에서 전체 상품을 불러옵니다.
  useEffect(() => {
    const loadProducts = async () => {
      const response = await fetch('/data/products.json')
      const productData = await response.json()
      setProducts(productData)
    }

    loadProducts()
  }, [])

  const selectedProducts = category
    ? products.filter((product) => product.categoryValue === category)
    : products

  const pageTitle = category ? categoryNames[category] : '전체 상품'

  return (
    <section className={styles.productsPage}>
      <div className={styles.titleArea}>
        <p>PRODUCTS</p>
        <h2>{pageTitle}</h2>
        <span>총 {selectedProducts.length}개의 상품이 있습니다.</span>
      </div>

      {/* 수정: JSON에서 선택된 상품을 ProductList에 전달합니다. */}
      <ProductList products={selectedProducts} />
    </section>
  )
}

export default Products
