// 리액트 리덕스의 connect 함수는 리액트와 리덕스를 연결한다.
import { connect } from 'react-redux';
import TodoForm from '../components/TodoForm';

import { addTodo } from '../ducks/todos';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onCreate: body => {
      dispatch(addTodo(body));
    },
  };
}

export default connect(
  // 다시 그리는 처리까지 한다.
  mapStateToProps, // redux state로부터 prop을 만들어내는 함수
  mapDispatchToProps // dispatch로부터 prop을 만들어내는 함수
)(TodoForm);

// connet가 반환하는 값은 리덕스와 연결된 (컨테이너)컴포넌트이다.
