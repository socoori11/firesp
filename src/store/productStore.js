import { create } from 'zustand'
export const useProductStore = create((set) => ({ products: [], product: null, setProducts: (products) => set({ products }), setProduct: (product) => set({ product }) }))
