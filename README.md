# ⚡ Make It Happen — Todo App

A clean, optimistic todo app built with **React** and **Tailwind CSS**.

---

## Tech Stack

- React 18 (hooks only)
- Tailwind CSS 3
- Vite
- localStorage for persistence

---

## Getting Started

```bash
# Create a Vite + React project
npm create vite@latest my-todo-app -- --template react
cd my-todo-app
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add to `tailwind.config.js`:

```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
```

Add to `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Drop `TodoApp.jsx` into `src/App.jsx`, then:

```bash
npm run dev
```

---

## Features

- Add tasks with a priority level (low / medium / high)
- Complete, edit inline, and delete tasks
- Filter by All, Active, or Done
- Live progress bar and stats
- Tasks saved to `localStorage` — survive page refresh
- Confetti micro-animation on task completion

---

## Project Structure

```
src/
├── App.jsx       # TodoApp (root), TodoItem, StatCard components
└── index.css     # Tailwind directives
```

---

## React Concepts Used

`useState` · `useEffect` · controlled inputs · immutable array updates · props · conditional rendering · list rendering with keys · derived state
