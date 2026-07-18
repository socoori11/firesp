import { create } from 'zustand'
export const useWishlistStore = create((set) => ({ wishlist: [], toggleWishlist: (product) => set((state) => ({ wishlist: state.wishlist.some((item) => item.id === product.id) ? state.wishlist.filter((item) => item.id !== product.id) : [...state.wishlist, product] })) }))
