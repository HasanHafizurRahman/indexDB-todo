import React, { useState, useEffect } from 'react';
import { addTodo, getTodos, updateTodo, deleteTodo } from './indexedDB';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      const todo = { text: newTodo, completed: false };
      await addTodo(todo);
      setTodos(await getTodos());
      setNewTodo('');
    }
  };

  const handleToggleComplete = async (id) => {
    const todo = todos.find((t) => t.id === id);
    await updateTodo(id, { completed: !todo.completed });
    setTodos(await getTodos());
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(await getTodos());
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do App</h1>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-lg"
            placeholder="Add a new task..."
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 p-2 rounded-lg shadow"
            >
              <span
                className={`flex-grow ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => handleToggleComplete(todo.id)}
                className={`px-3 py-1 rounded-lg ${
                  todo.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {todo.completed ? 'Undo' : 'Done'}
              </button>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
