import axios from 'axios';

// 액션 타입
const ADD_TODO_REQUEST = 'fds-redux-todo/todo/ADD_TODO_REQUEST';
const ADD_TODO_SUCCESS = 'fds-redux-todo/todo/ADD_TODO_SUCCESS';
const ADD_TODO_FAILURE = 'fds-redux-todo/todo/ADD_TODO_FAILURE';

const DELETE_TODO_REQUEST = 'fds-redux-todo/todo/DELETE_TODO_REQUEST';
const DELETE_TODO_SUCCESS = 'fds-redux-todo/todo/DELETE_TODO_SUCCESS';
const DELETE_TODO_FAILURE = 'fds-redux-todo/todo/DELETE_TODO_FAILURE';

const FETCH_TODOS_REQUEST = 'fds-redux-todo/todo/FETCH_TODOS_REQUEST';
const FETCH_TODOS_SUCCESS = 'fds-redux-todo/todo/FETCH_TODOS_SUCCESS';
const FETCH_TODOS_FAILURE = 'fds-redux-todo/todo/FETCH_TODOS_FAILURE';

// let idCount = 1;

// 액션 생산자
export function addTodoRequest() {
  return {
    type: ADD_TODO_REQUEST,
  };
}
export function addTodoSuccess() {
  return {
    type: ADD_TODO_SUCCESS,
  };
}
export function addTodoFailure(errorMsg) {
  return {
    type: ADD_TODO_FAILURE,
    errorMsg,
  };
}

export function addTodo(body) {
  return async function(dispatch) {
    dispatch(addTodoRequest());
    try {
      await axios.post('https://aspiring-waiter.glitch.me/todos', {
        body,
        complete: false,
      });
      dispatch(addTodoSuccess());
      dispatch(fetchTodos());
    } catch (e) {
      dispatch(addTodoFailure(e.message));
    }
  };
}

export function deleteTodoRequest() {
  return {
    type: DELETE_TODO_REQUEST,
  };
}
export function deleteTodoSuccess() {
  return {
    type: DELETE_TODO_SUCCESS,
  };
}
export function deleteTodoFailure(errorMsg) {
  return {
    type: DELETE_TODO_FAILURE,
    errorMsg,
  };
}

export function deleteTodo(id) {
  return async function(dispatch) {
    dispatch(deleteTodoRequest());
    try {
      await axios.delete(`https://aspiring-waiter.glitch.me/todos/${id}`);
      dispatch(deleteTodoSuccess());
      dispatch(fetchTodos());
    } catch (e) {
      dispatch(deleteTodoFailure(e.message));
    }
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
    case ADD_TODO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_TODO_FAILURE:
      return {
        ...state,
        loading: false,
        errorMsg: action.errorMsg,
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
