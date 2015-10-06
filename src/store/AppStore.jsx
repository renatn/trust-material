import Store from './Store.jsx';
import AppDispatcher from '../dispatcher/AppDispatcher.jsx'

let _step = 'LOGIN',
	_token = null;

class AppStore extends Store {

	constructor() {
		super();

		let tokenExpire = parseInt(sessionStorage.getItem('token_expire'), 10);
		if (!isNaN(tokenExpire) /* && tokenExpire > Date.now() */) { // TODO: Temporary disable check token expiration
		    _token = sessionStorage.getItem('token');
		    _step = sessionStorage.getItem('next');
		}
	}

	getToken() {
		return _token;
	}

	getState() {
		return {
			token: _token,
			step: _step
		}
	}

	isAuthenticated() {
		return _step !== 'LOGIN' && _step !== 'AUTH_SMS';
	}

}

let _instance = new AppStore();

_instance.dispatchToken = AppDispatcher.register(payload => {
	let action = payload.action;

	switch(action.type) {
	    case 'LOGIN-SUCCESS':
	        _step = action.data.next;
	        _token = action.data.sessionKey;

	        sessionStorage.setItem('next', _step);
	        sessionStorage.setItem('token', _token);
	        sessionStorage.setItem('token_expire', (Date.now() + (8 * 60 * 1000)).toString());

	        if (_step === 'MAIN' || _step === 'INSTR') {
	            sessionStorage.setItem('main', JSON.stringify(action.data));
	        } else if (_step === 'LICENCE') {
	            sessionStorage.setItem('license', action.data.licence);
	        }

	        location.reload(); // TODO: ugly hack to display mdl gumburger menu
	    	break;

    	case 'LOGOUT':
	        sessionStorage.clear();
    	    window.location.reload();
    		break;

		default:
			return;
	}

	_instance.emitChange();
});

export default _instance;

