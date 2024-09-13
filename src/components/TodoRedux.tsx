import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store-redux-index';
import { addTodo, deleteTodo, updateTodo, toggleTodo } from 'store/store-redux-slice-todo';

const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleAdd = () => {
    dispatch(addTodo(input));
    setInput('');
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
            <button onClick={() => dispatch(updateTodo({
              id: todo.id,
              text: prompt('Update todo', todo.text) || todo.text
            }))}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;