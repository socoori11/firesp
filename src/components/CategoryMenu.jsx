import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './CategoryMenu.module.scss'

const CategoryMenu = () => {
  // 수정: JSX에 있던 카테고리 데이터 대신 JSON 데이터를 저장합니다.
  const [categories, setCategories] = useState([])

  // 수정: categories.json에서 카테고리 데이터를 불러옵니다.
  useEffect(() => {
    const loadCategories = async () => {
      const response = await fetch('/data/categories.json')
      const categoryData = await response.json()
      setCategories(categoryData)
    }

    loadCategories()
  }, [])

  return (
    <section className={styles.categorySection}>
      <div className={styles.titleArea}>
        <p>SHOP BY CATEGORY</p>
        <h2>카테고리별 상품</h2>
      </div>

      <div className={styles.categoryList}>
        {/* 수정: JSON에서 불러온 카테고리를 반복해서 표시합니다. */}
        {categories.map((category) => (
          <Link key={category.id} to={category.path} className={styles.categoryItem}>
            <div className={styles.imageBox}>
              {category.image ? (
                <img src={category.image} alt={category.name} />
              ) : (
                <span className={styles.allText}>ALL</span>
              )}
            </div>
            <strong>{category.name}</strong>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default CategoryMenu
