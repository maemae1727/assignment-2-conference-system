Conference Room Reservation System

Full-Stack Web Application — Django REST Framework + React

This project is developed for **Assignment 2** and implements a full-stack conference room reservation system. The backend is built using **Django REST Framework**, and the frontend uses **React (Vite)**.
The application allows users to view rooms, authenticate, make reservations, and manage bookings.

---

📁 Project Structure

```
assignment-2-conference-system/
│
├── backend/
│   ├── conference_system/       # Django project
│   ├── rooms/                   # Rooms app
│   ├── reservations/            # Reservations app
│   ├── requirements.txt
│   └── manage.py
│
└── frontend/
    ├── src/
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

Features Implemented

🔹 **User Features**

* View all available conference rooms
* User login (JWT Authentication)
* Make reservations
* View personal reservations
* Cancel reservations

🔹 **Admin Features**

* Add, edit, delete conference rooms
* Make reservations for users
* Cancel user reservations
* View all reservations

---

**Technology Stack**

**Backend (Django REST Framework)**

* Django 5
* Django REST Framework
* Django SimpleJWT
* SQLite (development)

API Endpoints

| Endpoint                  | Description                                                |
| ------------------------- | ---------------------------------------------------------- |
| `/api/rooms/`             | List, create (admin), update (admin), delete (admin) rooms |
| `/api/reservations/`      | List, create, update, delete reservations                  |
| `/api/reservations/mine/` | Get reservations for the logged-in user                    |
| `/api/token/`             | Obtain JWT access + refresh tokens                         |
| `/api/token/refresh/`     | Refresh JWT token                                          |

---

**Frontend (React + Vite)**

* React 19
* Axios
* React Router
* Custom UI styling
* Handles user authentication
* Communicates with Django API

---

**Deployment Details**

**Frontend Deployment (Vercel)**

The React frontend is successfully deployed on Vercel:

**Live URL:**
`https://assignment-2-conference-system-z1pm.vercel.app/`

---

⚠️ **Backend Deployment Status**

The Django backend is **NOT deployed on Vercel**.

Why?

Vercel is optimized for **React/Next.js** apps, not long-running backend frameworks like Django.

Django requires:
* persistent processes
* long-running WSGI/ASGI server
* database connection pooling

But Vercel Python functions are **serverless**, short-lived, and not designed for Django.

Outcome:

✔ Backend **works fully on localhost**
✔ Frontend **works fully on Vercel**
✖ Frontend cannot reach backend from Vercel (CORS + no public backend URL)

Backend Development URL:

```
http://127.0.0.1:8000
```

---

🔧 **How to Run the Backend (Locally)**

1. Activate virtual environment

```
cd backend
python -m venv .venv
.venv\Scripts\activate  (Windows)
```

2. Install dependencies

```
pip install -r requirements.txt
```

3. Run migrations

```
python manage.py migrate
```

4. Create admin user

```
python manage.py createsuperuser
```

5. Start backend server

```
python manage.py runserver
```

Backend now available at:
👉 **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

**How to Run the Frontend (Locally)**

```
cd frontend
npm install
npm run dev
```

Frontend dev server:
👉 [http://localhost:5173](http://localhost:5173)

---

**Environment Variables**

**Backend (.env)**

```
SECRET_KEY=your-secret-key
DEBUG=True
USE_SQLITE=True
```

**Frontend (.env)**

```
VITE_API_BASE=http://127.0.0.1:8000
```

---

**Important Note**

The frontend is deployed on Vercel.
> The backend is *not* deployed on Vercel due to Django backend compatibility issues with Vercel’s serverless Python runtime.
> The backend works fully in local development and is demonstrated through localhost during the assessment.
> The system is fully functional when the frontend runs locally and communicates with the backend at `127.0.0.1:8000`.**
