import { useEffect, useState } from 'react'
import api from '../api'

export default function MyReservations() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const { data } = await api.get('reservations/mine/')
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function cancel(id) {
    if (!window.confirm('Cancel this reservation?')) return
    await api.delete(`reservations/${id}/`)
    load()
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Reservations</h1>
        <p className="page-subtitle">
          Manage your upcoming bookings. You can cancel a reservation if your plans change.
        </p>
      </div>

      <div className="card">
        {loading ? (
          <p>Loading reservations…</p>
        ) : items.length === 0 ? (
          <p>You don’t have any reservations yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Start</th>
                <th>End</th>
                <th>Purpose</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(r => (
                <tr key={r.id}>
                  <td>{r.room_name}</td>
                  <td>{new Date(r.start_datetime).toLocaleString()}</td>
                  <td>{new Date(r.end_datetime).toLocaleString()}</td>
                  <td>{r.purpose || '—'}</td>
                  <td className="table-actions">
                    <button
                      className="btn btn--danger btn--sm"
                      onClick={() => cancel(r.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
