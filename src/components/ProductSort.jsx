import React from 'react'
import styles from './ProductSort.module.scss'

const ProductSort = ({ sortType, setSortType }) => {
  return (
    <div className={styles.sortArea}>
      <label htmlFor="product-sort">정렬</label>

      {/* 수정: 선택한 정렬 값을 Products 컴포넌트에 전달합니다. */}
      <select
        id="product-sort"
        value={sortType}
        onChange={(event) => setSortType(event.target.value)}
      >
        <option value="latest">최신순</option>
        <option value="priceLow">낮은 가격순</option>
        <option value="priceHigh">높은 가격순</option>
      </select>
    </div>
  )
}

export default ProductSort
