import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { todoListState } from 'store/store-recoil';
import { useTodoDispatchers } from 'store/recoil-dispatcher';

const TodoList: React.FC = () => {
  const todoList = useRecoilValue(todoListState);
  const [input, setInput] = useState('');
  const { addTodo, deleteTodo, toggleTodo, updateTodo } = useTodoDispatchers();

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };

  const handleUpdate = (id: number) => {
    const newText = prompt('Update todo');
    if (newText) {
      updateTodo(id, newText);
    }
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => handleUpdate(todo.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;