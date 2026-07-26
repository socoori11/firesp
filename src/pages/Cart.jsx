import React, { useEffect, useState } from 'react'
import CartItem from '../components/CartItem'
import EmptyMessage from '../components/EmptyMessage'
import OrderSummary from '../components/OrderSummary'
import { DELIVERY_FEE, FREE_DELIVERY_MINIMUM } from '../constants/delivery'
import { loadLocal, saveLocal } from '../utils/localStorage'
import styles from './Cart.module.scss'

const Cart = () => {
  // Cart 페이지를 열 때 localStorage의 최신 장바구니를 가져옵니다.
  const savedCartItems = loadLocal('cart', [])

  // 가져온 장바구니를 화면에서 사용할 상태로 저장합니다.
  const [cartItems, setCartItems] = useState(savedCartItems)

  // 수정: 상품 수량이나 목록이 바뀔 때 localStorage에도 저장합니다.
  useEffect(() => {
    saveLocal('cart', cartItems)
  }, [cartItems])

  const changeQuantity = (productId, newQuantity) => {
    const changedItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity }
      }

      return item
    })

    setCartItems(changedItems)
  }

  const removeItem = (productId) => {
    const remainingItems = cartItems.filter((item) => item.id !== productId)
    setCartItems(remainingItems)
  }

  const clearCart = () => {
    const shouldClear = window.confirm('장바구니 상품을 모두 삭제하시겠습니까?')

    if (shouldClear) {
      setCartItems([])
    }
  }

  // 상품 한 개의 할인된 가격을 계산합니다.
  const getDiscountPrice = (item) => {
    const discountAmount = (item.price * item.discountRate) / 100
    return item.price - discountAmount
  }

  // 모든 장바구니 상품의 금액을 더합니다.
  const subtotal = cartItems.reduce((total, item) => {
    const discountPrice = getDiscountPrice(item)
    return total + discountPrice * item.quantity
  }, 0)

  // 기본 배송비를 지정한 후 무료배송 조건을 확인합니다.
  let deliveryFee = DELIVERY_FEE

  if (subtotal === 0 || subtotal >= FREE_DELIVERY_MINIMUM) {
    deliveryFee = 0
  }

  const totalPrice = subtotal + deliveryFee

  const orderCart = () => {
    window.alert('주문 페이지는 다음 단계에서 연결합니다.')
  }

  return (
    <section className={styles.cartPage}>
      <div className={styles.titleArea}>
        <p>CART</p>
        <h2>장바구니</h2>
        <span>담은 상품 {cartItems.length}개</span>
      </div>

      {cartItems.length === 0 ? (
        <EmptyMessage
          image="/img/empty/empty-cart.png"
          title="장바구니가 비어 있습니다."
          description="마음에 드는 상품을 장바구니에 담아보세요."
          link="/products"
          linkText="상품 보러 가기"
        />
      ) : (
        <div className={styles.cartLayout}>
          <div className={styles.itemSection}>
            <div className={styles.itemHeader}>
              <strong>장바구니 상품</strong>
              <button type="button" onClick={clearCart}>전체 삭제</button>
            </div>

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onChangeQuantity={changeQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <OrderSummary
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            totalPrice={totalPrice}
            onOrder={orderCart}
          />
        </div>
      )}
    </section>
  )
}

export default Cart
