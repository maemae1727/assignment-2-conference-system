import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Rooms from './pages/Rooms'
import MyReservations from './pages/MyReservations'
import AdminRooms from './pages/AdminRooms'
import { AuthProvider, useAuth } from './auth'
import './App.css'   // make sure this is here

function Nav() {
  const { user, logout } = useAuth()
  return (
    <header className="app-header">
      <nav className="nav">
        <div className="nav-left">
          <span className="brand">Te Whare Rūnanga • Rooms</span>
        </div>
        <div className="nav-right">
          <Link className="nav-link" to="/">Rooms</Link>
          {user && <Link className="nav-link" to="/me">My Reservations</Link>}
          <Link className="nav-link" to="/admin-rooms">Admin</Link>
          {user ? (
            <button className="nav-button" onClick={logout}>
              Logout ({user})
            </button>
          ) : (
            <Link className="nav-button nav-button--primary" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app-shell">
          <Nav />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Rooms />} />
              <Route path="/login" element={<Login />} />
              <Route path="/me" element={<MyReservations />} />
              <Route path="/admin-rooms" element={<AdminRooms />} />
            </Routes>
          </main>
          <footer className="app-footer">
            <span>Conference Room Reservation System · Te Whare Rūnanga Ltd</span>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}
