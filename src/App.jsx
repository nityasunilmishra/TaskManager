import { useState, useEffect } from "react";

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2);
const FILTERS = ["All", "Active", "Done"];
const POP = ["✨", "🎉", "⚡", "🌟", "💜"];

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [popped, setPopped] = useState(false);

  const handleToggle = () => {
    if (!todo.completed) {
      setPopped(true);
      setTimeout(() => setPopped(false), 600);
    }
    onToggle(todo.id);
  };

  const handleSave = () => {
    if (editText.trim()) onEdit(todo.id, editText.trim());
    else setEditText(todo.text);
    setIsEditing(false);
  };

  const badgeStyle = todo.priority === "high"
    ? "bg-pink-50 text-pink-700 border border-pink-200"
    : todo.priority === "medium"
    ? "bg-amber-50 text-amber-700 border border-amber-200"
    : "bg-emerald-50 text-emerald-700 border border-emerald-200";

  return (
    <div className={`group relative flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200
      ${todo.completed
        ? "bg-violet-50/40 border-violet-100"
        : "bg-white border-violet-100 hover:border-violet-300 hover:shadow-md hover:shadow-violet-100"
      }`}>

      <button
        onClick={handleToggle}
        aria-label={todo.completed ? "Mark incomplete" : "Mark complete"}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
          ${todo.completed ? "bg-violet-600 border-violet-600" : "border-violet-200 hover:border-violet-500"}`}
      >
        {todo.completed && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") { setEditText(todo.text); setIsEditing(false); } }}
            className="w-full text-sm bg-transparent border-b border-violet-400 outline-none py-0.5 text-violet-950"
          />
        ) : (
          <span
            onDoubleClick={() => !todo.completed && setIsEditing(true)}
            className={`block text-sm truncate select-none transition-all
              ${todo.completed ? "line-through text-violet-300" : "text-violet-950"}`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {!todo.completed && todo.priority && (
        <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold ${badgeStyle}`}>
          {todo.priority}
        </span>
      )}

      {/* confetti pop */}
      {popped && (
        <span className="absolute right-10 top-2 text-sm animate-bounce pointer-events-none">
          {POP[todo.id.charCodeAt(0) % POP.length]}
        </span>
      )}

      <div className="flex-shrink-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!todo.completed && (
          <button onClick={() => setIsEditing(true)} aria-label="Edit"
            className="p-1 rounded-md text-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        )}
        <button onClick={() => onDelete(todo.id)} aria-label="Delete"
          className="p-1 rounded-md text-violet-300 hover:text-pink-600 hover:bg-pink-50 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function StatCard({ num, label }) {
  return (
    <div className="flex-1 bg-white rounded-2xl border border-violet-100 p-3 text-center">
      <div className="text-xl font-bold text-violet-600">{num}</div>
      <div className="text-xs text-violet-400 mt-0.5">{label}</div>
    </div>
  );
}

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos-vibrant");
      return saved ? JSON.parse(saved) : [
        { id: generateId(), text: "Build a React app", completed: true, priority: "high" },
        { id: generateId(), text: "Learn useState and useEffect", completed: false, priority: "high" },
        { id: generateId(), text: "Style with Tailwind CSS", completed: false, priority: "medium" },
        { id: generateId(), text: "Add features like filters", completed: false, priority: "low" },
      ];
    } catch { return []; }
  });

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("low");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("todos-vibrant", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const t = input.trim();
    if (!t) return;
    setTodos(p => [{ id: generateId(), text: t, completed: false, priority }, ...p]);
    setInput("");
  };

  const toggleTodo = (id) => setTodos(p => p.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTodo = (id) => setTodos(p => p.filter(t => t.id !== id));
  const editTodo = (id, text) => setTodos(p => p.map(t => t.id === id ? { ...t, text } : t));
  const clearDone = () => setTodos(p => p.filter(t => !t.completed));

  const filtered = todos.filter(t =>
    filter === "Active" ? !t.completed : filter === "Done" ? t.completed : true
  );
  const done = todos.filter(t => t.completed).length;
  const left = todos.length - done;
  const pct = todos.length ? Math.round((done / todos.length) * 100) : 0;

  const priBtn = (p, label) => {
    const active = priority === p;
    const styles = {
      low: active ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "",
      medium: active ? "bg-amber-50 border-amber-200 text-amber-700" : "",
      high: active ? "bg-pink-50 border-pink-200 text-pink-700" : "",
    };
    return (
      <button key={p} onClick={() => setPriority(p)}
        className={`text-xs px-3 py-1 rounded-full border font-semibold capitalize transition-all
          ${active ? styles[p] : "border-violet-100 text-violet-300 hover:border-violet-200"}`}>
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-violet-50 flex items-start justify-center pt-14 px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200 mb-3">
            ⚡ Today's momentum
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-violet-950">
            Make it <span className="text-violet-600">happen</span>
          </h1>
          <p className="text-xs text-violet-400 mt-1">Every task done is a win — keep the streak alive</p>
        </div>

        {/* Stat cards */}
        <div className="flex gap-2 mb-5">
          <StatCard num={done} label="done today" />
          <StatCard num={left} label="left to go" />
          <StatCard num={`${pct}%`} label="complete" />
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl border border-violet-100 p-4 mb-4">
          <div className="flex gap-2 mb-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="What will you conquer today?"
              className="flex-1 text-sm bg-violet-50 border border-violet-100 rounded-xl px-3 py-2.5 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all placeholder-violet-300 text-violet-950"
            />
            <button onClick={addTodo}
              className="px-4 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 active:scale-95 transition-all">
              + Add
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-violet-400">Priority:</span>
            {priBtn("low", "low")}
            {priBtn("medium", "medium")}
            {priBtn("high", "high")}
          </div>
        </div>

        {/* Progress */}
        {todos.length > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-violet-400">{left} task{left !== 1 ? "s" : ""} remaining</span>
              <span className="text-violet-600 font-semibold">{pct}% done</span>
            </div>
            <div className="h-2 bg-violet-100 rounded-full overflow-hidden">
              <div className="h-full bg-violet-600 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex gap-1 bg-violet-100 p-1 rounded-xl mb-4">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-1 text-xs py-1.5 rounded-lg font-semibold transition-all
                ${filter === f ? "bg-white text-violet-700 shadow-sm shadow-violet-100" : "text-violet-400 hover:text-violet-600"}`}>
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-violet-300">
              <div className="text-3xl mb-3">{filter === "Done" ? "🏆" : "✨"}</div>
              <p className="text-sm">
                {filter === "Done" ? "Haven't finished anything yet — go crush it!"
                  : filter === "Active" ? "All caught up! Time to celebrate."
                  : "Add a task and start your streak."}
              </p>
            </div>
          ) : (
            filtered.map(todo => (
              <TodoItem key={todo.id} todo={todo}
                onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
            ))
          )}
        </div>

        {done > 0 && (
          <div className="mt-4 text-center">
            <button onClick={clearDone}
              className="text-xs text-violet-300 hover:text-pink-500 transition-colors">
              Clear {done} completed task{done !== 1 ? "s" : ""}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
