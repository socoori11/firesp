import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './SearchBox.module.scss'

const SearchBox = () => {
  // 수정: 검색창에 입력한 내용을 저장합니다.
  const [searchKeyword, setSearchKeyword] = useState('')
  const navigate = useNavigate()

  // 수정: 검색 버튼을 누르면 검색 결과 페이지로 이동합니다.
  const searchProducts = (event) => {
    event.preventDefault()

    const keyword = searchKeyword.trim()

    if (keyword === '') {
      return
    }

    navigate(`/search/${encodeURIComponent(keyword)}`)
    setSearchKeyword('')
  }

  return (
    <form className={styles.searchBox} onSubmit={searchProducts}>
      <input
        type="search"
        value={searchKeyword}
        onChange={(event) => setSearchKeyword(event.target.value)}
        placeholder="찾고 싶은 상품을 검색하세요"
        aria-label="상품 검색"
      />
      <button type="submit">검색</button>
    </form>
  )
}

export default SearchBox
