import { useEffect, useState } from 'react'
import api from '../api'


export default function AdminRooms() {
    const [rooms, setRooms] = useState([])
    const [form, setForm] = useState({ name: '', capacity: 4, location: '', has_projector: false })


    async function load() { setRooms((await api.get('rooms/')).data) }
    useEffect(() => { load() }, [])


    async function createRoom(e) {
        e.preventDefault()
        await api.post('rooms/', form)
        setForm({ name: '', capacity: 4, location: '', has_projector: false })
        load()
    }


    async function remove(id) {
        await api.delete(`rooms/${id}/`);
        load()
    }


return (
    <div className="container">
    <h2>Admin: Rooms</h2>
    <form onSubmit={createRoom}>
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" />
        <input type="number" value={form.capacity} onChange={e=>setForm({...form, capacity:Number(e.target.value)})} />
        <input value={form.location} onChange={e=>setForm({...form, location:e.target.value})} placeholder="Location" />
        <label>
            <input type="checkbox" checked={form.has_projector} onChange={e=>setForm({...form, has_projector:e.target.checked})} /> Projector
        </label>
        <button>Add</button>
    </form>


    <ul>
        {rooms.map(r => (
        <li key={r.id}>
            {r.name} (cap {r.capacity}) <button onClick={() => remove(r.id)}>Delete</button>
        </li>
        ))}
    </ul>
</div>
)
}