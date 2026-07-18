import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductCard.module.scss'

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false)

  const discountPrice = product.price - (product.price * product.discountRate) / 100

  const changeWishlist = () => {
    setIsLiked(!isLiked)
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
