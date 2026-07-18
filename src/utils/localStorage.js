export const saveLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value))
export const loadLocal = (key, fallback = null) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback } }
export const removeLocal = (key) => localStorage.removeItem(key)
