// store.ts
import { createStore } from 'redux';
import { Reducer } from 'redux';

// Action Types
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Action Creators
interface AddTodoAction {
  type: typeof ADD_TODO;
  payload: string;
}

interface DeleteTodoAction {
  type: typeof DELETE_TODO;
  payload: number;
}

interface UpdateTodoAction {
  type: typeof UPDATE_TODO;
  payload: { id: number; text: string };
}

interface ToggleTodoAction {
  type: typeof TOGGLE_TODO;
  payload: number;
}

type TodoActionTypes = AddTodoAction | DeleteTodoAction | UpdateTodoAction | ToggleTodoAction;

// Initial State
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const initialState: Todo[] = [];

// Reducer
const todoReducer: Reducer<Todo[], TodoActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.payload);
    case UPDATE_TODO:
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
      );
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

// Store
const store = createStore(todoReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// Action Creators Export
export { ADD_TODO, DELETE_TODO, UPDATE_TODO, TOGGLE_TODO };