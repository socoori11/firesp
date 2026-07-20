import React from 'react'
import styles from './QuantityControl.module.scss'

const QuantityControl = ({ quantity, setQuantity, maxQuantity }) => {
  // 수정: 수량 감소 기능을 QuantityControl 안에서 처리합니다.
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // 수정: 재고보다 많아지지 않도록 수량 증가를 처리합니다.
  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1)
    }
  }

  return (
    <div className={styles.quantityControl}>
      {/* 수정: 수량이 1이면 감소 버튼을 사용할 수 없습니다. */}
      <button type="button" onClick={decreaseQuantity} disabled={quantity === 1} aria-label="수량 감소">
        −
      </button>
      <span>{quantity}</span>
      <button type="button" onClick={increaseQuantity} disabled={quantity === maxQuantity} aria-label="수량 증가">
        +
      </button>
    </div>
  )
}

export default QuantityControl
