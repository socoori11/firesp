import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loadLocal, saveLocal } from '../utils/localStorage'
import styles from './ProductCard.module.scss'

const ProductCard = ({ product, onWishlistChange }) => {
  // [찜 기능 추가 1] 카드가 처음 나타날 때 저장된 찜 상태를 확인합니다.
  const savedWishlist = loadLocal('wishlist', [])

  // some() 대신 기본 반복문을 사용해 상품을 하나씩 확인합니다.
  let savedProduct = false

  for (let index = 0; index < savedWishlist.length; index += 1) {
    const wishlistProduct = savedWishlist[index]

    if (wishlistProduct.id === product.id) {
      savedProduct = true
      break
    }
  }

  const [isLiked, setIsLiked] = useState(savedProduct)

  const discountPrice = product.price - (product.price * product.discountRate) / 100

  const changeWishlist = () => {
    // [찜 기능 추가 2] 버튼을 누른 시점의 최신 찜 목록을 다시 가져옵니다.
    const wishlistItems = loadLocal('wishlist', [])
    const newLikedState = !isLiked

    if (newLikedState) {
      // 찜하기: 기존 목록 뒤에 현재 상품을 추가합니다.
      saveLocal('wishlist', [...wishlistItems, product])
    } else {
      // 찜 취소: 현재 상품 id를 제외한 상품만 남깁니다.
      const remainingItems = wishlistItems.filter((item) => item.id !== product.id)
      saveLocal('wishlist', remainingItems)
    }

    setIsLiked(newLikedState)

    // [찜 기능 추가 3] Wishlist 페이지가 즉시 갱신되도록 변경 결과를 전달합니다.
    if (onWishlistChange) {
      onWishlistChange(product.id, newLikedState)
    }
  }

  return (
    <article className={styles.card}>
      <div className={styles.imageArea}>
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>

        <button
          type="button"
          className={styles.wishlistButton}
          onClick={changeWishlist}
          aria-label={isLiked ? '찜 목록에서 삭제' : '찜 목록에 추가'}
        >
          {isLiked ? '♥' : '♡'}
        </button>
      </div>

      <div className={styles.information}>
        <p className={styles.category}>{product.category}</p>
        <Link to={`/products/${product.id}`} className={styles.name}>
          {product.name}
        </Link>

        <div className={styles.priceArea}>
          {product.discountRate > 0 && (
            <span className={styles.discount}>{product.discountRate}%</span>
          )}
          <strong>{discountPrice.toLocaleString()}원</strong>
        </div>

        {product.discountRate > 0 && (
          <del>{product.price.toLocaleString()}원</del>
        )}
      </div>
    </article>
  )
}

export default ProductCard
