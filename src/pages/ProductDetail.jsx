import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import QuantityControl from '../components/QuantityControl'
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

  // 수정: Zustand 연결 전에는 장바구니 동작을 안내창으로 확인합니다.
  const addToCart = () => {
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
