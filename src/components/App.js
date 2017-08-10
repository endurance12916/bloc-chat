// connect
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

// insert data into the component
function mapStateToProps(state) {
  return {
    rooms: state.room, // -> this.props.room = state.room
    messages: state.messages,
    user: state.user
  }
}

// insert actions into the component
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

// all action creators and all data(states) are now available to the Main component
const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;

// or put all these code into Main.js and 
// export default connect(mapStateToProps, mapDispatchToProps)(Main);
// and rename Main back to App