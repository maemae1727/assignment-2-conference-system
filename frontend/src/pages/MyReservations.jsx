import { useEffect, useState } from 'react'
import api from '../api'


export default function MyReservations() {
    const [items, setItems] = useState([])

    async function load() {
        const { data } = await api.get('reservations/mine/')
        setItems(data)
    }
    useEffect(() => { load() }, [])

    async function cancel(id) {
        await api.delete(`reservations/${id}/`)
        load()
    }

    return (
    <div className="container">
        <h2>My Reservations</h2>
        <ul>
            {items.map(r => (
                <li key={r.id}>
                    {r.room_name} — {new Date(r.start_datetime).toLocaleString()} → {new Date(r.end_datetime).toLocaleString()}
                    <button onClick={() => cancel(r.id)}>Cancel</button>
                </li>
            ))}
        </ul>
    </div>
  )
}