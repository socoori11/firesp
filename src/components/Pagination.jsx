import React from 'react'
import styles from './Pagination.module.scss'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // 수정: 전체 페이지 수만큼 페이지 번호 배열을 만듭니다.
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className={styles.pagination} aria-label="상품 페이지 이동">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={currentPage === pageNumber ? styles.active : ''}
          onClick={() => onPageChange(pageNumber)}
          aria-current={currentPage === pageNumber ? 'page' : undefined}
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </nav>
  )
}

export default Pagination
