import React, { useEffect, useState } from 'react'
import EmptyMessage from '../components/EmptyMessage'
import ProductList from '../components/ProductList'
import { loadLocal, saveLocal } from '../utils/localStorage'
import styles from './Wishlist.module.scss'

const Wishlist = () => {
  // [찜 목록 추가 1] 페이지를 열 때 localStorage의 찜 상품을 가져옵니다.
  const savedWishlist = loadLocal('wishlist', [])
  const [wishlistItems, setWishlistItems] = useState(savedWishlist)

  // [찜 목록 추가 2] 화면의 찜 배열이 바뀔 때 localStorage도 같은 내용으로 저장합니다.
  useEffect(() => {
    saveLocal('wishlist', wishlistItems)
  }, [wishlistItems])

  const changeWishlist = (productId, isLiked) => {
    // [찜 목록 추가 3] 카드에서 찜을 취소하면 해당 카드를 화면에서도 제거합니다.
    if (!isLiked) {
      const remainingItems = wishlistItems.filter((item) => item.id !== productId)
      setWishlistItems(remainingItems)
    }
  }

  return (
    <section className={styles.wishlistPage}>
      <div className={styles.titleArea}>
        <p>WISHLIST</p>
        <h2>찜 목록</h2>
        <span>관심 상품 {wishlistItems.length}개</span>
      </div>

      {wishlistItems.length === 0 ? (
        <EmptyMessage
          image="/img/empty/no-product.png"
          title="찜한 상품이 없습니다."
          description="관심 있는 상품을 찜 목록에 추가해 보세요."
          link="/products"
          linkText="상품 보러 가기"
        />
      ) : (
        <ProductList
          products={wishlistItems}
          onWishlistChange={changeWishlist}
        />
      )}
    </section>
  )
}

export default Wishlist
