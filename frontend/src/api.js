import axios from 'axios'


export const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'


const api = axios.create({ baseURL: `${API_BASE}/api/` })


api.interceptors.request.use(config => {
    const token = localStorage.getItem('access')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})


export default api