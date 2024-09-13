import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/store-redux-index';
import { addTodo } from 'store/store-redux-slice-todo';
import { setUserName } from 'store/store-redux-slice-userOrder';
import useStore from 'store/store-zustand';

// const TodosComponent: React.FC = () => {
//   const todos = useSelector((state: RootState) => state.todos);
//   console.log('todosComponent rendered');
//   return <ul>
//   {todos.map(todo => (
//     <li key={todo.id}>
//       <span>
//         {todo.text}
//       </span>
//     </li>
//   ))}
// </ul>
// };

// const UserNameComponent: React.FC = () => {
//   const userName = useSelector((state: RootState) => state.userOrders.userName);
//   console.log('UserNameComponent rendered');
//   return <p>User Name: {userName}</p>;
// };

// const ParentComponent: React.FC = () => {
//   const dispatch = useDispatch();
//   const userName = useSelector((state: RootState) => state.userOrders.userName);

//   console.log('ParentComponent rendered');
//   return (
//     <div>
//       <p>{userName}</p>
//       <button onClick={() => dispatch(addTodo('testTodo'))}>Increase todos</button>
//       <button onClick={() => dispatch(setUserName('testUser'))}>Change User Name</button>
//       <TodosComponent />
//       <UserNameComponent />
//     </div>
//   );
// };

// export default ParentComponent;

const CountComponent = () => {
    const todos = useStore(state => state.todos);
    console.log('todosComponent rendered');
    return <ul>
      {todos.map(todo => (
       <li key={todo.id}>
         <span>
            {todo.text}
          </span>
         </li>
       ))}
     </ul>
  };
  
  const UserNameComponent = () => {
    const userName = useStore((state) => state.userName);
    console.log('UserNameComponent rendered');
    return <p>User Name: {userName}</p>;
  };
  
  const ParentComponent = () => {
    const addTodo = useStore(state => state.addTodo);
    const userName = useStore(state => state.userName)
    const setUserName = useStore(state => state.setUserName)
  
    console.log('ParentComponent rendered');
    return (
      <div>
        <p>{userName}</p>
        <button onClick={() => addTodo('dd')}>add todo</button>
        <button onClick={() => setUserName('Jane Doe')}>Change User Name</button>
        <CountComponent />
        <UserNameComponent />
      </div>
    );
  };
  
  export default ParentComponent;