import { useState } from "react";
import { useTodo } from "../contexts";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={handleAdd} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-2 text-white placeholder-slate-400"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 font-medium transition-colors"
      >
        Add
      </button>
    </form>
  );
}