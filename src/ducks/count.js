// 액션 타입
const INCR = 'fds-redux-todo/counter/INCR';
const ZERO = 'fds-redux-todo/counter/ZERO';

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

// 리듀서
export default function count(state = 0, action) {
  switch (action.type) {
    case INCR:
      return state + action.amount;
    case ZERO:
      return 0;
    default:
      return state;
  }
}
