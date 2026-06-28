# ⚡ Make It Happen — Todo App

A clean, optimistic todo app built with **React** and **Tailwind CSS**, scaffolded with Vite.

---

## Tech Stack

- React 18 (hooks only)
- Tailwind CSS 3
- Vite
- localStorage for persistence

---

## Project Structure

```
TASKMANAGER/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── App.css
│   ├── App.jsx        # TodoApp (root), TodoItem, StatCard components
│   ├── index.css      # Tailwind directives
│   └── main.jsx       # React DOM entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Features

- Add tasks with a priority level (low / medium / high)
- Complete, edit inline, and delete tasks
- Filter by All, Active, or Done
- Live progress bar and stats
- Tasks saved to `localStorage` — survive page refresh
- Confetti micro-animation on task completion

---

## React Concepts Used

`useState` · `useEffect` · controlled inputs · immutable array updates · props · conditional rendering · list rendering with keys · derived state

