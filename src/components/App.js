// connect
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Main from './Main';

// insert data into the component
// this function accepts state and then returns an object of props
function mapStateToProps(state) {
  return {
    rooms: state.rooms, // -> this.props.rooms = state.rooms
    showAddRoom: state.showAddRoom,
    messages: state.messages,
    users: state.users,
    showSignIn: state.showSignIn
  }
}

// insert actions into the component
// this function is able to dispatch our action creator with a prop.
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

// all action creators and all data(states) are now available to the Main component
const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;

// or put all these code into Main.js and 
// export default connect(mapStateToProps, mapDispatchToProps)(Main);
// and rename Main back to App