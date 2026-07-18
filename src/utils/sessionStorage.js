export const saveSession = (key, value) => sessionStorage.setItem(key, JSON.stringify(value))
export const loadSession = (key, fallback = null) => { try { return JSON.parse(sessionStorage.getItem(key)) ?? fallback } catch { return fallback } }
export const removeSession = (key) => sessionStorage.removeItem(key)
