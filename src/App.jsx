import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [todos, setTodos] = useState([]);

  // 1. Add Task
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  // 2. Update Task
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  // 3. Delete Task
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  // 4. Toggle Complete Task
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };

  // LocalStorage Step 1: Load saved todos on first render
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  // LocalStorage Step 2: Save whenever 'todos' array updates
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-10 px-4">
        <div className="w-full max-w-2xl mx-auto shadow-xl rounded-2xl px-6 py-8 text-white bg-[#24385b]/40 border border-slate-700">
          <h1 className="text-2xl font-black text-center mb-8 mt-2 tracking-wide">
            Manage Your Daily Todos
          </h1>
          <div className="mb-6">
            <TodoForm />
          </div>
          <div className="flex flex-col gap-y-3">
            {todos.length === 0 ? (
              <p className="text-center text-slate-400 py-6 text-sm">
                No todos added yet. Add one above!
              </p>
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}