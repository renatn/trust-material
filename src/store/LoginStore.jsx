import Store from './Store.jsx';
import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import Actions from '../actions/Actions.jsx';
import DemoMainUtils from '../utils/DemoMainUtils.js';

let _submitted = false,
    _errorMessage = '',
    _executing = false;


class LoginStore extends Store {

  constructor() {
    super();
  }

  getState() {
    return {
      submitted: _submitted,
      errorMessage: _errorMessage,
      executing: _executing
    };
  }

}

let _instance = new LoginStore();

_instance.dispatchToken = AppDispatcher.register(payload => {
  let action = payload.action;

  switch(action.type) {

    case 'LOGIN':
      _executing = true;
      break;

    case 'LOGIN-CONFIRM':
      _executing = true;
      break;

    case 'LOGIN-ERROR':
      _executing = false;
      _errorMessage = action.message;
      break;
      
    case 'LOGIN-DEMO':
      _executing = true;
      setTimeout(function() {
        Actions.successLogin(DemoMainUtils.getDemoMain());
      }, 1000);
      break;

    default:
      return;
  }

  _instance.emitChange();

});

export default _instance;