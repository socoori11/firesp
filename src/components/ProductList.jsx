import React from 'react'
import ProductCard from './ProductCard'
import styles from './ProductList.module.scss'

// onWishlistChange는 Wishlist 페이지에서만 전달하는 선택적인 함수입니다.
const ProductList = ({ products = [], onWishlistChange }) => {
  if (products.length === 0) {
    return <p className={styles.emptyMessage}>등록된 상품이 없습니다.</p>
  }

  return (
    <div className={styles.productList}>
      {/* ProductCard에서 찜 상태가 바뀌면 새 찜 목록을 Wishlist 페이지로 전달합니다. */}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onWishlistChange={onWishlistChange}
        />
      ))}
    </div>
  )
}

export default ProductList
