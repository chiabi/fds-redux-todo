import {connect} from 'react-redux';
import TodoList from '../components/TodoList';

function mapStateToProps(state) {
  return {
    todos: state.todos,
  }
}

function mapDispatchToProps(dispatch) {}

export default connect( // 다시 그리는 처리까지 한다.
  mapStateToProps,
  mapDispatchToProps
)(TodoList)