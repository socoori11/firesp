import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import QuantityControl from '../components/QuantityControl'
// 수정 후: 장바구니를 localStorage에 저장하기 위해 추가했습니다.
import { loadLocal, saveLocal } from '../utils/localStorage'
import styles from './ProductDetail.module.scss'

const ProductDetail = () => {
  const { id } = useParams()

  // 수정: JSON에서 찾은 상품과 사용자가 선택한 수량을 저장합니다.
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 수정: 주소의 id와 같은 상품을 products.json에서 찾습니다.
  useEffect(() => {
    const loadProduct = async () => {
      const response = await fetch('/data/products.json')
      const productData = await response.json()
      const selectedProduct = productData.find((item) => String(item.id) === id)

      setProduct(selectedProduct || null)
      setIsLoading(false)
    }

    loadProduct()
  }, [id])

  if (isLoading) {
    return <p className={styles.message}>상품을 불러오는 중입니다.</p>
  }

  if (!product) {
    return (
      <div className={styles.message}>
        <p>상품을 찾을 수 없습니다.</p>
        <Link to="/products">상품 목록으로 이동</Link>
      </div>
    )
  }

  const discountPrice = product.price - (product.price * product.discountRate) / 100
  const totalPrice = discountPrice * quantity

  // 수정 전: 안내창만 표시하고 실제 장바구니에는 저장하지 않았습니다.
  // const addToCart = () => {
  //   window.alert(`${product.name} ${quantity}개를 장바구니에 담았습니다.`)
  // }

  // 수정 후: Zustand 연결 전까지 localStorage에 장바구니 상품을 저장합니다.
  const addToCart = () => {
    const cartItems = loadLocal('cart', [])
    const existingItem = cartItems.find((item) => item.id === product.id)

    let changedCart
  // 내가 가진 상품이 있으면 수량 추가 그 상품에 수량 추가
    if (existingItem) {
      changedCart = cartItems.map((item) => {
        if (item.id === product.id) {
          const newQuantity = Math.min(item.quantity + quantity, product.stock)
          return { ...item, quantity: newQuantity }
        }

        return item
      })
    } else {
      changedCart = [...cartItems, { ...product, quantity }]
    }

    saveLocal('cart', changedCart)
    window.alert(`${product.name} ${quantity}개를 장바구니에 담았습니다.`)
  }

  return (
    <section className={styles.detailPage}>
      <Link to="/products" className={styles.backLink}>← 상품 목록</Link>

      <div className={styles.productArea}>
        <div className={styles.imageArea}>
          <img src={product.image} alt={product.name} />
        </div>

        <div className={styles.information}>
          <p className={styles.category}>{product.category}</p>
          <h2>{product.name}</h2>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.priceArea}>
            {product.discountRate > 0 && (
              <>
                <span className={styles.discount}>{product.discountRate}%</span>
                <del>{product.price.toLocaleString()}원</del>
              </>
            )}
            <strong>{discountPrice.toLocaleString()}원</strong>
          </div>

          <div className={styles.deliveryInfo}>
            <span>배송비</span>
            <strong>50,000원 이상 무료배송</strong>
          </div>

          <div className={styles.quantityArea}>
            <span>수량</span>
            <QuantityControl
              quantity={quantity}
              setQuantity={setQuantity}
              maxQuantity={product.stock}
            />
            <small>재고 {product.stock}개</small>
          </div>

          <div className={styles.totalArea}>
            <span>총 상품 금액</span>
            <strong>{totalPrice.toLocaleString()}원</strong>
          </div>

          <div className={styles.buttonArea}>
            <button type="button" className={styles.likeButton} onClick={() => setIsLiked(!isLiked)}>
              {isLiked ? '♥ 찜 완료' : '♡ 찜하기'}
            </button>
            <button type="button" className={styles.cartButton} onClick={addToCart}>장바구니 담기</button>
            <button type="button" className={styles.buyButton}>바로 구매</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
