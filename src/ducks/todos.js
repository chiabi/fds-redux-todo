// 액션 타입
const ADD_TODO = 'fds-redux-todo/todo/ADD_TODO';
let idCount = 1;

// 액션 생산자
export function addTodo(body) {
  return {
    type: ADD_TODO,
    body,
  };
}

// 리듀서
export default function todos(state = [], action) {
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
