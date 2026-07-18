import { useMemo } from 'react'
export const useSearch = (items = [], keyword = '') => useMemo(() => items.filter((item) => item.name?.toLowerCase().includes(keyword.toLowerCase())), [items, keyword])
