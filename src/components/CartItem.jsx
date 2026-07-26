import React from 'react'
import { Link } from 'react-router-dom'
import QuantityControl from './QuantityControl'
import styles from './CartItem.module.scss'

const CartItem = ({ item, onChangeQuantity, onRemove }) => {
  const discountPrice = item.price - (item.price * item.discountRate) / 100
  const itemTotal = discountPrice * item.quantity

  // 수정: QuantityControl에서 받은 수량을 상품 id와 함께 부모에게 전달합니다.
  const changeQuantity = (newQuantity) => {
    onChangeQuantity(item.id, newQuantity)
  }

  return (
    <article className={styles.cartItem}>
      <Link to={`/products/${item.id}`} className={styles.imageArea}>
        <img src={item.image} alt={item.name} />
      </Link>

      <div className={styles.information}>
        <p>{item.category}</p>
        <Link to={`/products/${item.id}`}>{item.name}</Link>
        <strong>{discountPrice.toLocaleString()}원</strong>
      </div>

      <div className={styles.quantityArea}>
        <span>수량</span>
        <QuantityControl
          quantity={item.quantity}
          setQuantity={changeQuantity}
          maxQuantity={item.stock}
        />
      </div>

      <div className={styles.totalArea}>
        <span>상품 금액</span>
        <strong>{itemTotal.toLocaleString()}원</strong>
      </div>

      {/* 수정: 삭제할 상품 id를 부모 컴포넌트에 전달합니다. */}
      <button
        type="button"
        className={styles.removeButton}
        onClick={() => onRemove(item.id)}
        aria-label={`${item.name} 삭제`}
      >
        ×
      </button>
    </article>
  )
}

export default CartItem
