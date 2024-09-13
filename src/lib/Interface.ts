import store from "store/store-redux-index";
import { addTodo } from "store/store-redux-slice-todo";
import useStore, { TodoState } from "store/store-zustand";

export const unsubscribe = useStore.subscribe(
    (state: TodoState) => {
      console.log('Todos changed:', state.todos);
    }
  );

export const unsub = store.subscribe(()=> {
    console.log('Todos changed:', store.getState().todos)
})

export const letsDoIt = () => {
    //zustand
    useStore.getState().addTodo('vanila zustand')

    //redux
    //store.dispatch(addTodo('vanila redux'))
}