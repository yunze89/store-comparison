import { useSetRecoilState } from 'recoil';
import { todoListState, Todo } from 'store/store-recoil';

// dispatcher 내부에서 useSetRecoilState를 사용하여 직접 상태 업데이트
export const useTodoDispatchers = () => {
  const setTodoList = useSetRecoilState(todoListState);

  const addTodo = (text: string) => {
    setTodoList((oldTodoList: Todo[]) => [
      ...oldTodoList,
      { id: Date.now(), text, completed: false }
    ]);
  };

  const deleteTodo = (id: number) => {
    setTodoList((oldTodoList: Todo[]) => oldTodoList.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodoList((oldTodoList: Todo[]) =>
      oldTodoList.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id: number, newText: string) => {
    setTodoList((oldTodoList: Todo[]) =>
      oldTodoList.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return { addTodo, deleteTodo, toggleTodo, updateTodo };
};