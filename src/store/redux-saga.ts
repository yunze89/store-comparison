/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery, delay } from 'redux-saga/effects';   //이펙트 유틸 함수
import { fetchData, fetchOrdersSuccess, fetchUserSuccess, logResult, Order, User } from './store-redux-slice-userOrder';

/**
 * 요구사항
 * 1. 사용자 정보와 그 사용자의 주문 목록을 가져오는 두 개의 API 호출
 * 2. 사용자 정보 조회 API 호출이 실패하면 2초 후 재시도
 * 3. 주문 정보 조회 API 호출은 첫 번째 API가 성공한 후에만 실행, 주문정보 조회 API도 실패하면 재시도
 * 4. api 호출마다, 모든 작업이 끝난 후 성공 여부를 기록
 * 
 */

//유저 정보 조회 API
const fetchUser = async (): Promise<User> => {
  const res = await fetch('/api/user');
  return res.json();
};

//주문정보 조회 API
const fetchOrders = async (userId: number): Promise<Order[]> => {
  const res = await fetch(`/api/orders/${userId}`);
  return res.json();
};

//유저 정보 조회 사가
function* fetchUserSaga(): Generator<any, User | undefined, User> {
  let user: User | undefined;
  try {
    user = yield call(fetchUser);
    yield put(fetchUserSuccess(user));
  } catch {
    yield delay(2000); // Retry after delay
    try {
      user = yield call(fetchUser);
      yield put(fetchUserSuccess(user));
    } catch {
      yield put(logResult('failed'));
      return undefined;
    }
  }
  return user;
}

//주문정보 조회 사가
function* fetchOrdersSaga(userId: number): Generator<any, void, Order[]> {
  let orders: Order[];
  try {
    orders = yield call(fetchOrders, userId);
    yield put(fetchOrdersSuccess(orders));
  } catch {
    yield delay(2000);
    try {
      orders = yield call(fetchOrders, userId);
      yield put(fetchOrdersSuccess(orders));
    } catch {
      yield put(logResult('failed'));
      return;
    }
  }
}

//유저 정보 조회 후 주문정보 조회하는 함수
function* fetchDataSaga(): Generator<any, void, User | undefined> {
  const user: User | undefined = yield call(fetchUserSaga); // Fetch user
  if (user) {
    yield call(fetchOrdersSaga, user.id);
  }
  yield put(logResult('complete'));
}

// Watcher saga
export function* watchFetchData(): Generator<any, void, void> {
    yield takeEvery(fetchData.type, fetchDataSaga); // fetchData action이 실행될 때마다 fetchDataSaga 실행
    //takeLatest: 중복된 이전 네트워크 요청을 취소하고 가장 최근의 요청만 처리
    //takeLeading: 액션이 여러 번 발생해도 첫 번째 액션만 처리하고, 해당 사가가 실행되는 동안 들어오는 다른 액션들은 무시
    //race: 여러 작업 중 가장 빠른 작업만 처리
    //throttle: 지정된 시간 간격 내에서 같은 액션이 여러 번 발생하면, 첫 번째 액션만 처리하고 나머지 액션들은 일정 시간 동안 무시
    //debounce,...
}
