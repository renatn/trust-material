import request from 'superagent';
import Store from './Store.jsx';
import AppStore from '../store/AppStore.jsx';
import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import Actions from '../actions/Actions.jsx';

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
      request
        .post('/api/v1/sessions')
        .send('username='+action.username)
        .send('password='+action.password)
        .set('Accept', 'application/json')
        .end(function (err, res) {Actions.handleLogin(res);});
      break;

    case 'LOGIN-RESPONSE':
      _executing = false; 

      if (action.response.ok) {
          if (action.response.body.error) {
              _errorMessage = action.response.body.error;
          } else {
              Actions.successLogin(action.response.body)
          }
      } else if (res.statusCode === 422)  {
          _errorMessage = res.body.error;
      } else {
          _errorMessage = 'Интернет-банк временно не доступен. Скоро все будет ОК.';
      }
      break;

    case 'LOGIN-CONFIRM':
      _executing = false; 
      request
            .post('/api/v1/auth2')
            .send('smsKey='+action.code)
            .set('Accept', 'application/json')
            .set('Authorization', AppStore.getToken())
            .end(function (err, res) {Actions.handleLogin(res)});
      break;      

    default:
      return;
  }

  _instance.emitChange();

});

export default _instance;