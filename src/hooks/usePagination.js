export const usePagination = (items = [], page = 1, perPage = 12) => ({ items: items.slice((page - 1) * perPage, page * perPage), totalPages: Math.ceil(items.length / perPage) })
