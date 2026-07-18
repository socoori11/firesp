import { useAuthStore } from '../store/authStore'
export const useAuth = () => { const user = useAuthStore((state) => state.user); return { user, isLoggedIn: Boolean(user) } }
