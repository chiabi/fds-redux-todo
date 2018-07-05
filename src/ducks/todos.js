import axios from 'axios';

// 액션 타입
const ADD_TODO = 'fds-redux-todo/todo/ADD_TODO';
const FETCH_TODOS_REQUEST = 'fds-redux-todo/todo/FETCH_TODOS_REQUEST';
const FETCH_TODOS_SUCCESS = 'fds-redux-todo/todo/FETCH_TODOS_SUCCESS';
const FETCH_TODOS_FAILURE = 'fds-redux-todo/todo/FETCH_TODOS_FAILURE';
let idCount = 1;

// 액션 생산자
export function addTodo(body) {
  return {
    type: ADD_TODO,
    body,
  };
}

// 리듀서
export function fetchTodosRequest() {
  return {
    type: FETCH_TODOS_REQUEST,
  };
}

export function fetchTodosSuccess(todos) {
  return {
    type: FETCH_TODOS_SUCCESS,
    todos,
  };
}

export function fetchTodosFailure(errorMsg) {
  return {
    type: FETCH_TODOS_FAILURE,
    errorMsg,
  };
}

// redux-thunk 미들웨어가 적용된 스토어에
// 함수를 투입하면
// 스토어는 그 함수에 dispatch 함수를 인수로 줘서 실행시킨다.

export function fetchTodos() {
  return async function(dispatch) {
    dispatch(fetchTodosRequest());
    try {
      const res = await axios.get('https://aspiring-waiter.glitch.me/todos');
      dispatch(fetchTodosSuccess(res.data));
    } catch (e) {
      dispatch(fetchTodosFailure(e.message));
    }
  };
}

// state 설계하기
// 관리해야 할 데이터
// - 할 일 목록
// - 로딩 여부
// - 에러메시지

const initialState = {
  items: [],
  loading: false,
  errorMsg: null,
};
export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: idCount++,
            body: action.body,
            complete: false,
          },
        ],
      };
    case FETCH_TODOS_REQUEST:
      // 로딩인디케이터 켜주기
      return {
        ...state,
        loading: true,
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.todos,
      };
    case FETCH_TODOS_FAILURE:
      return {
        ...state,
        errorMsg: action.errorMsg,
      };
    default:
      return state;
  }
}
