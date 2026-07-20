import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './ProductFilter.module.scss'

const ProductFilter = ({ selectedCategory, priceRange, setPriceRange }) => {
  // 수정: categories.json에서 받은 카테고리를 저장합니다.
  const [categories, setCategories] = useState([])

  // 수정: 하드코딩된 배열 대신 categories.json을 불러옵니다.
  useEffect(() => {
    const loadCategories = async () => {
      const response = await fetch('/data/categories.json')
      const categoryData = await response.json()
      setCategories(categoryData)
    }

    loadCategories()
  }, [])

  // 수정: 현재 주소의 카테고리와 같은 메뉴에 활성 스타일을 적용합니다.
  const getCategoryClass = (categoryPath) => {
    if (categoryPath === '/products' && selectedCategory === '') {
      return styles.active
    }

    if (selectedCategory !== '' && categoryPath.endsWith(selectedCategory)) {
      return styles.active
    }

    return ''
  }

  return (
    <div className={styles.filterArea}>
      <div className={styles.categoryFilter}>
        <strong>카테고리</strong>

        <div className={styles.categoryList}>
          {/* 수정: 카테고리를 선택하면 해당 주소로 이동합니다. */}
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className={getCategoryClass(category.path)}
            >
              {category.name === '전체보기' ? '전체' : category.name}
            </Link>
          ))}
        </div>
      </div>

      <label className={styles.priceFilter}>
        <strong>가격대</strong>
        {/* 수정: 선택한 가격대를 Products 컴포넌트에 전달합니다. */}
        <select value={priceRange} onChange={(event) => setPriceRange(event.target.value)}>
          <option value="all">전체 가격</option>
          <option value="under100000">10만원 미만</option>
          <option value="100000to300000">10만원 이상 ~ 30만원 미만</option>
          <option value="over300000">30만원 이상</option>
        </select>
      </label>
    </div>
  )
}

export default ProductFilter
