import React from 'react'
import ProductCard from './ProductCard'
import styles from './ProductList.module.scss'

const ProductList = ({ products = [] }) => {
  if (products.length === 0) {
    return <p className={styles.emptyMessage}>등록된 상품이 없습니다.</p>
  }

  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
