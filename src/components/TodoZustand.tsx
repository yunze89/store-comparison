// TodoList.tsx
import React, { useState } from 'react';
import useStore from 'store/store-zustand';

const TodoList: React.FC = () => {
  const { todos, addTodo, deleteTodo, updateTodo, toggleTodo } = useStore();
  const [input, setInput] = useState('');

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => {
        addTodo(input);
        setInput('');
      }}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => updateTodo(todo.id, prompt('Update todo', todo.text) || todo.text)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;