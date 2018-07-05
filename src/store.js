import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import count from './ducks/count';
import todos from './ducks/todos';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
  todos,
  count,
});

// 스토어
// 리덕스는 독립적인 라이브러리이므로 아래의 스토어는 아직 리액트와 연결된 상태가 아니다.
export const store = createStore(
  rootReducer,
  // 리덕스 개발 도구와 연결
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  // redux thunk와 logger를 사용하자
  // 리덕스 내장함수인 applyMiddleware를 임포트시켜서 사용한다.
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

// 스토어의 여러가지 메소드를 호출할 수 있다.
// store.getState() // 상태를 읽어옴
// store.dispatch() // 상태 변경
// store.subscribe() // 상태가 변했을 때 어떤 동작을 실행
store.subscribe(() => {
  console.log(store.getState());
});

// 'react-redux'라는 라이브러리를 통해 리액트와 리덕스를 연결한다.
