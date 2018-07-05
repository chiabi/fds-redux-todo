import { combineReducers, createStore } from 'redux';

// 액션: 상태를 어떻게 변형시킬지 나타내는 **객체**
// `type`이라는 속성을 가지고 있어야 한다.

// 액션 타입
const INCR = 'INCR';
const ZERO = 'ZERO';

const ADD_TODO = 'ADD_TODO';

let idCount = 1;

// 액션 생산자 (action creator)
export function incr(amount) {
  return {
    type: INCR,
    amount,
  };
}

export function zero() {
  return {
    type: ZERO,
  };
}

export function addTodo(body) {
  return {
    type: ADD_TODO,
    body,
  };
}

// store.dispatch(zero()) 식으로 사용하기 위한 액션

// 리듀서
// 상태와 액션을 인수로 받아서, 다음 상태를 반환하는 *순수 함수*

// 매개변수 기본값과 default 는 초기 상태를 지정해 주기 위한 관례이다.
function count(state = 0, action) {
  switch (action.type) {
    case INCR:
      return state + action.amount;
    case ZERO:
      return 0;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: idCount++,
          body: action.body,
          complete: false,
        },
      ];
    default:
      return state;
  }
}

// const initialState = {
//   count: 0,
//   todos: [],
// }; // 관례

// combineReducers를 사용하지 않으면 원래는 switch 구문을 이용해 일일이 합쳐줘야함

// 작은 리듀서 여러 개를 만든 다음
// combineReducers를 사용해 합칠 수 있다.
const rootReducer = combineReducers({
  todos,
  count,
});

// 스토어
// 리덕스는 독립적인 라이브러리이므로 아래의 스토어는 아직 리액트와 연결된 상태가 아니다.
export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// 스토어의 여러가지 메소드를 호출할 수 있다.
// store.getState() // 상태를 읽어옴
// store.dispatch() // 상태 변경
// store.subscribe() // 상태가 변했을 때 어떤 동작을 실행
store.subscribe(() => {
  console.log(store.getState());
});

// 'react-redux'라는 라이브러리를 통해 리액트와 리덕스를 연결한다.
