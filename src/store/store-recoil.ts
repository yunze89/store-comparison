import { atom, selector } from 'recoil';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});

export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.completed).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
    };
  },
});