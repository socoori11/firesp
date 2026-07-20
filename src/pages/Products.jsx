import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductFilter from '../components/ProductFilter'
import ProductList from '../components/ProductList'
import ProductSort from '../components/ProductSort'
import Pagination from '../components/Pagination'
import { usePagination } from '../hooks/usePagination'
import { ITEMS_PER_PAGE } from '../constants/pagination'
import styles from './Products.module.scss'

const categoryNames = {
  keyboard: '키보드',
  mouse: '마우스',
  monitor: '모니터',
  laptop: '노트북',
  speaker: '스피커',
  accessory: '액세서리',
}

const Products = () => {
  const { category } = useParams()

  // 수정: JSX에 있던 상품 데이터 대신 JSON 데이터를 저장합니다.
  const [products, setProducts] = useState([])
  // 수정: 사용자가 선택한 가격대 값을 저장합니다.
  const [priceRange, setPriceRange] = useState('all')
  // 수정: 사용자가 선택한 상품 정렬 방식을 저장합니다.
  const [sortType, setSortType] = useState('latest')
  // 수정: 현재 보고 있는 페이지 번호를 저장합니다.
  const [currentPage, setCurrentPage] = useState(1)

  // 수정: products.json에서 전체 상품을 불러옵니다.
  useEffect(() => {
    const loadProducts = async () => {
      const response = await fetch('/data/products.json')
      const productData = await response.json()
      setProducts(productData)
    }

    loadProducts()
  }, [])

  const categoryProducts = category
    ? products.filter((product) => product.categoryValue === category)
    : products

  // 수정: 할인된 실제 판매 가격을 기준으로 상품을 필터링합니다.
  const selectedProducts = categoryProducts.filter((product) => {
    const discountPrice = product.price - (product.price * product.discountRate) / 100

    if (priceRange === 'under100000') {
      return discountPrice < 100000
    }

    if (priceRange === '100000to300000') {
      return discountPrice >= 100000 && discountPrice < 300000
    }

    if (priceRange === 'over300000') {
      return discountPrice >= 300000
    }

    return true
  })

  // 수정: 필터링된 배열을 복사한 후 선택한 기준으로 정렬합니다.
  /*  
    const numbers = [30, 10, 50, 20, 40]
    numbers.sort((a, b) => a - b) 10, 20,30,40,50
  const products = [
    { id: 1, name: '키보드', price: 89000 },
    { id: 2, name: '마우스', price: 39000 },
    { id: 3, name: '모니터', price: 249000 }
  ]

  products.sort((a, b) => a.price - b.price)

  */
  const sortedProducts = [...selectedProducts].sort((firstProduct, secondProduct) => {
    const firstPrice = firstProduct.price - (firstProduct.price * firstProduct.discountRate) / 100
    const secondPrice = secondProduct.price - (secondProduct.price * secondProduct.discountRate) / 100

    if (sortType === 'priceLow') {
      return firstPrice - secondPrice
    }

    if (sortType === 'priceHigh') {
      return secondPrice - firstPrice
    }

    return secondProduct.id - firstProduct.id
  })

  // 수정: 정렬된 상품 중 현재 페이지에 해당하는 상품만 가져옵니다.
  const pagination = usePagination(sortedProducts, currentPage, ITEMS_PER_PAGE)

  const pageTitle = category ? categoryNames[category] : '전체 상품'

  return (
    <section className={styles.productsPage}>
      <div className={styles.titleArea}>
        <p>PRODUCTS</p>
        <h2>{pageTitle}</h2>
        <span>총 {selectedProducts.length}개의 상품이 있습니다.</span>
      </div>

      {/* 수정: 상품 목록 위에 카테고리와 가격 필터를 연결합니다. */}
      <ProductFilter
        selectedCategory={category || ''}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {/* 수정: 상품 목록 위에 정렬 선택 메뉴를 연결합니다. */}
      <ProductSort sortType={sortType} setSortType={setSortType} />

      {/* 수정: 현재 페이지에 해당하는 상품만 ProductList에 전달합니다. */}
      <ProductList products={pagination.items} />

      {/* 수정: 상품 목록 아래에 페이지 이동 버튼을 연결합니다. */}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  )
}

export default Products
