import { configureStore } from "@reduxjs/toolkit";
import { userOrderSlice } from "./store-redux-slice-userOrder";
import { todoSlice } from "./store-redux-slice-todo";
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { watchFetchData } from './redux-saga';
import { composeWithDevTools } from '@redux-devtools/extension';

//saga middleware 생성
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
      todos: todoSlice.reducer,
      userOrders: userOrderSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // saga middleware를 store에 설정
    //devTools: composeWithDevTools(),    //devTools 사용을 위한 설정
  });

// root saga
function* rootSaga() {
    yield all([watchFetchData()]);
}

// saga 실행
sagaMiddleware.run(rootSaga);
  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
  
export default store;