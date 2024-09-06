// TodoList.tsx
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from 'store/store-recoil';

const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [input, setInput] = useState('');

  const addTodo = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      { id: Date.now(), text: input, completed: false }
    ]);
    setInput('');
  };

  const deleteTodo = (id: number) => {
    setTodoList((oldTodoList) => oldTodoList.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodoList((oldTodoList) => oldTodoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const updateTodo = (id: number) => {
    const newTodoText = prompt('Update todo');
    setTodoList((oldTodoList) => oldTodoList.map((todo) =>
      todo.id === id ? { ...todo, text: newTodoText || todo.text } : todo
    ));
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
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
            <button onClick={() => updateTodo(todo.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;