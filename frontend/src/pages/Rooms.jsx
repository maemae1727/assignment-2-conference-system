import { useEffect, useState } from 'react'
import api from '../api'


export default function Rooms() {
    const [rooms, setRooms] = useState([])


    useEffect(() => { api.get('rooms/').then(r => setRooms(r.data)) }, [])


    return (
    <div className="container">
        <h2>Available Rooms</h2>
        <ul>
            {rooms.map(r => (
                <li key={r.id}>
                    <strong>{r.name}</strong> – cap {r.capacity} {r.has_projector ? '🎥' : ''}
                </li>
            ))}
        </ul>
    </div>
  )
}