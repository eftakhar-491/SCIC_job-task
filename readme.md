# Task Management Application

## Description

This is a Task Management Application where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections: **To-Do, In Progress, and Done**. The app features real-time synchronization and instant data persistence for a seamless experience. It has a clean, minimalistic, and fully responsive UI for both desktop and mobile users.

## Live Demo

- Frontend: [Live Link](#)
- Backend: [Live Link](#)

## Technologies Used

### Frontend:

- React 19
- React Router 7
- TailwindCSS 4
- Axios
- Vite
- React Icons
- Firebase (for authentication/storage)
- LocalForage (for caching)
- Match Sorter (for search/filtering)
- Socket.io Client (for real-time updates)

### Backend:

- Node.js
- Express.js
- MongoDB
- Socket.io (for real-time synchronization)
- CORS
- Dotenv (for environment variable management)

## Installation

### Prerequisites:

- Node.js installed (latest version recommended)
- MongoDB running locally or accessible via cloud

### Steps to Run Locally:

#### Clone the Repository:

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app
```

#### Backend Setup:

```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm start
```

#### Frontend Setup:

```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port Vite specifies) in your browser.

## Dependencies

### Frontend:

```json
"dependencies": {
  "@tailwindcss/vite": "^4.0.7",
  "axios": "^1.7.9",
  "firebase": "^11.3.1",
  "localforage": "^1.10.0",
  "match-sorter": "^8.0.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-icons": "^5.5.0",
  "react-router": "^7.2.0",
  "socket.io-client": "^4.8.1",
  "tailwindcss": "^4.0.7"
}
```

### Backend:

```json
"dependencies": {
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "mongodb": "^6.13.0",
  "socket.io": "^4.8.1"
}
```

## Features

- **Task Management:** Add, edit, delete, and reorder tasks
- **Drag-and-Drop Interface:** Easy task movement between categories
- **Real-Time Updates:** Changes reflect instantly using WebSockets
- **Persistent Storage:** Saves task updates instantly in the database
- **Responsive Design:** Optimized for mobile and desktop

## License

This project is open-source under the MIT License.
