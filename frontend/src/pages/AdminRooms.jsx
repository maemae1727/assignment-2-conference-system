import { useEffect, useState } from 'react'
import api from '../api'

export default function AdminRooms() {
  const [rooms, setRooms] = useState([])
  const [form, setForm] = useState({
    name: '',
    capacity: 4,
    location: '',
    has_projector: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const res = await api.get('rooms/')
      setRooms(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function createRoom(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await api.post('rooms/', form)
      setForm({ name: '', capacity: 4, location: '', has_projector: false })
      load()
    } finally {
      setSaving(false)
    }
  }

  async function remove(id) {
    if (!window.confirm('Delete this room?')) return
    await api.delete(`rooms/${id}/`)
    load()
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Admin • Rooms</h1>
        <p className="page-subtitle">
          Add, update, or remove conference rooms available in the booking system.
        </p>
      </div>

      <div className="layout-split">
        <div className="card">
          <h2>Add new room</h2>
          <form className="form" onSubmit={createRoom}>
            <div className="form-group">
              <label>Room name</label>
              <input
                className="input"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Kauri Conference"
                required
              />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input
                className="input"
                type="number"
                min="1"
                value={form.capacity}
                onChange={e => setForm({ ...form, capacity: Number(e.target.value) })}
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                className="input"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Level 1, West Wing"
              />
            </div>
            <div className="form-group form-group--inline">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.has_projector}
                  onChange={e =>
                    setForm({ ...form, has_projector: e.target.checked })
                  }
                />
                Has projector
              </label>
            </div>

            <button className="btn btn--primary" disabled={saving}>
              {saving ? 'Saving…' : 'Add room'}
            </button>
          </form>
        </div>

        <div className="card">
          <h2>Existing rooms</h2>
          {loading ? (
            <p>Loading rooms…</p>
          ) : rooms.length === 0 ? (
            <p>No rooms yet. Add one using the form on the left.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Projector</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rooms.map(r => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td>{r.location || '—'}</td>
                    <td>{r.capacity}</td>
                    <td>{r.has_projector ? 'Yes' : 'No'}</td>
                    <td className="table-actions">
                      <button
                        className="btn btn--danger btn--sm"
                        onClick={() => remove(r.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
