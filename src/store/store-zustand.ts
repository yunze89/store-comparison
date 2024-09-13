import { create } from 'zustand';
import { immer, devtools } from 'zustand/middleware';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
  toggleTodo: (id: number) => void;

  //rerender test 용도
  userName: string;
  setUserName: (name: string) => void;
}

const useStore = create<TodoState>(
  (set) => ({
    todos: [],
    addTodo: (text) =>
      set((state) => ({
        todos: [...state.todos, { id: Date.now(), text, completed: false }],
    })),
    deleteTodo: (id) =>
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      })),
    updateTodo: (id, text) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, text } : todo
      ),
    })),
    toggleTodo: (id) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
    })),
  
    //rerender test 용도
    userName: '',
    setUserName: (userName: string) => set(() => ({
      userName
    }))
  })
)

  //immer를 사용한 불변성을 자동으로 유지하는 예시
// const useStore = create<TodoState>()(
//   immer((set) => ({
//     todos: [],
//     addTodo: (text) =>
//       set((state) => {
//         state.todos.push({ id: Date.now(), text, completed: false });
//       }),
//     deleteTodo: (id) =>
//       set((state) => {
//         state.todos = state.todos.filter((todo) => todo.id !== id);
//       }),
//     updateTodo: (id, text) =>
//       set((state) => {
//         const todo = state.todos.find((todo) => todo.id === id);
//         if (todo) {
//           todo.text = text;
//         }
//       }),
//     toggleTodo: (id) =>
//       set((state) => {
//         const todo = state.todos.find((todo) => todo.id === id);
//         if (todo) {
//           todo.completed = !todo.completed;
//         }
//       }),
    
       //rerender test 용도
//     userName: '',
//     setUserName: (userName: string) => set((state) => state.userName = userName)
//   }))
// );

//devTools 사용을 위한 설정
// const useStoreWithDevTools = create<TodoState>()(
//   devtools((set) => ({
//     todos: [],
//     addTodo: (text) =>
//       set((state) => ({
//         todos: [...state.todos, { id: Date.now(), text, completed: false }],
//     }), false, 'addTodo'),
//     deleteTodo: (id) =>
//       set((state) => ({
//         todos: state.todos.filter((todo) => todo.id !== id),
//       }), false, 'deleteTodo'),
//     updateTodo: (id, text) =>
//       set((state) => ({
//         todos: state.todos.map((todo) =>
//           todo.id === id ? { ...todo, text } : todo
//       ),
//     }), false, 'updateTodo'),
//     toggleTodo: (id) =>
//       set((state) => ({
//         todos: state.todos.map((todo) =>
//           todo.id === id ? { ...todo, completed: !todo.completed } : todo
//         ),
//     }), false, 'toggleTodo'),
  
//     //rerender test 용도
//     userName: '',
//     setUserName: (userName: string) => set(() => ({
//       userName
//     }), false, 'setUserName')
//   }), {name: 'todoStore'})
// );

export default useStore;
//export default useStoreWithDevTools;