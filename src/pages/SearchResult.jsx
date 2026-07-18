import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductList from '../components/ProductList'
import styles from './SearchResult.module.scss'

const SearchResult = () => {
  const { keyword } = useParams()

  // 수정: SearchBox가 주소로 전달한 검색어의 결과를 저장합니다.
  const [searchResults, setSearchResults] = useState([])

  // 수정: 상품명 또는 카테고리에 검색어가 포함된 상품을 찾습니다.
  useEffect(() => {
    const searchProducts = async () => {
      const response = await fetch('/data/products.json')
      const productData = await response.json()
      // 수정: 대소문자와 앞뒤 공백의 영향을 받지 않도록 검색어를 정리합니다.
      const lowerKeyword = keyword.toLowerCase().trim()

      const results = productData.filter((product) => {
        const productName = product.name.toLowerCase()
        const productCategory = product.category.toLowerCase()

        return productName.includes(lowerKeyword) || productCategory.includes(lowerKeyword)
      })

      setSearchResults(results)
    }

    searchProducts()
  }, [keyword])

  return (
    <section className={styles.searchPage}>
      <div className={styles.titleArea}>
        <p>SEARCH</p>
        <h2>“{keyword}” 검색 결과</h2>
        <span>총 {searchResults.length}개의 상품을 찾았습니다.</span>
      </div>

      <ProductList products={searchResults} />
    </section>
  )
}

export default SearchResult
