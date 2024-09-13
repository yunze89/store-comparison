import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch, ADD_TODO, DELETE_TODO, UPDATE_TODO, TOGGLE_TODO } from 'store/store-old-redux';

const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state);
  
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    dispatch({ type: ADD_TODO, payload: input });
    setInput('');
  };

  const handleToggleTodo = (id: number) => {
    dispatch({ type: TOGGLE_TODO, payload: id });
  };

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: DELETE_TODO, payload: id });
  };

  const handleUpdateTodo = (id: number) => {
    const text = prompt('Enter new todo text') || '';
    dispatch({ type: UPDATE_TODO, payload: { id, text } });
  };

  return (
    <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => handleToggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleUpdateTodo(todo.id)}>Update</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;