import { createContext, useContext, useState } from 'react'
import api from './api'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => localStorage.getItem('username'))


    async function login(username, password) {
        const { data } = await api.post('token/', { username, password })
        localStorage.setItem('access', data.access)
        localStorage.setItem('refresh', data.refresh)
        localStorage.setItem('username', username)
        setUser(username)
    }

    function logout() {
        localStorage.clear()
        setUser(null)
    }

    return (
        <AuthCtx.Provider value={{ user, login, logout }}>
            {children}
        </AuthCtx.Provider>
    )
}