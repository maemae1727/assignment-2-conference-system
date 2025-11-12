import { useState } from 'react'
import { useAuth } from '../auth'


export default function Login() {
    const { login } = useAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    async function submit(e) {
        e.preventDefault()
        try { await login(username, password) }
        catch { setError('Invalid credentials') }
    }


    return (
        <div className="container">
            <h2>Sign in</h2>
            <form onSubmit={submit}>
                <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
                <button>Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}