import React from 'react'
import styles from './OrderSummary.module.scss'

const OrderSummary = ({ subtotal, deliveryFee, totalPrice, onOrder }) => {
  return (
    <aside className={styles.summary}>
      <h3>결제 금액</h3>

      <div className={styles.priceRow}>
        <span>상품 금액</span>
        <strong>{subtotal.toLocaleString()}원</strong>
      </div>

      <div className={styles.priceRow}>
        <span>배송비</span>
        <strong>{deliveryFee === 0 ? '무료' : `${deliveryFee.toLocaleString()}원`}</strong>
      </div>

      <div className={styles.totalRow}>
        <span>총 결제 금액</span>
        <strong>{totalPrice.toLocaleString()}원</strong>
      </div>

      {/* 수정: 주문 페이지 구현 전에는 버튼 동작을 부모에서 전달받습니다. */}
      <button type="button" onClick={onOrder} disabled={subtotal === 0}>
        주문하기
      </button>
    </aside>
  )
}

export default OrderSummary
