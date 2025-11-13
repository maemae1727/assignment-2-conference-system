import { useEffect, useState } from 'react'
import api from '../api'

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('rooms/')
      .then(r => setRooms(r.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <h1>Available Rooms</h1>
        <p className="page-subtitle">
          Browse conference rooms and check capacity and equipment before booking.
        </p>
      </div>

      {loading ? (
        <div className="card card--center">
          <p>Loading rooms…</p>
        </div>
      ) : (
        <div className="card-grid">
          {rooms.map(r => (
            <div key={r.id} className="card room-card">
              <div className="room-card__header">
                <h2>{r.name}</h2>
                {r.has_projector && <span className="pill pill--accent">Projector</span>}
              </div>
              <p className="room-card__meta">
                <span>{r.location || 'Location TBC'}</span>
              </p>
              <p className="room-card__capacity">
                Capacity: <strong>{r.capacity}</strong> people
              </p>
            </div>
          ))}
          {rooms.length === 0 && (
            <div className="card card--center">
              <p>No rooms found. Please ask an administrator to add some rooms.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
