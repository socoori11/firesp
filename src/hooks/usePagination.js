export const usePagination = (items = [], page = 1, perPage = 4) => {
  const totalPages = Math.ceil(items.length / perPage)

  // 수정: 필터 결과가 줄어들어도 존재하는 페이지 안에서 표시합니다.
  const lastPage = Math.max(totalPages, 1)
  const currentPage = Math.min(Math.max(page, 1), lastPage)
  const startIndex = (currentPage - 1) * perPage
  const endIndex = startIndex + perPage

  return {
    items: items.slice(startIndex, endIndex),
    totalPages,
    currentPage,
  }
}
