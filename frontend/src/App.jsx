import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Rooms from './pages/Rooms'
import MyReservations from './pages/MyReservations'
import AdminRooms from './pages/AdminRooms'
import { AuthProvider, useAuth } from './auth'


function Nav() {
    const { user, logout } = useAuth()
    return (
    <nav>
        <Link to="/">Rooms</Link>{' | '}
        {user && <Link to="/me">My Reservations</Link>}{' | '}
        <Link to="/admin-rooms">Admin</Link>{' | '}
        {user ? <button onClick={logout}>Logout ({user})</button> : <Link to="/login">Login</Link>}
    </nav>
    )
}


export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Rooms />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/me" element={<MyReservations />} />
                    <Route path="/admin-rooms" element={<AdminRooms />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}