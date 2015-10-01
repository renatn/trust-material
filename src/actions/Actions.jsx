import AppDispatcher from '../dispatcher/AppDispatcher.jsx'

export default class Actions {
    static login(username, password) {
        AppDispatcher.handleAction({
        	type: 'LOGIN',
        	username: username,
        	password: password
        });
    }

    static handleLogin(response) {
        AppDispatcher.handleAction({
        	type: 'LOGIN-RESPONSE',
        	response: response
        });
    }

    static successLogin(data) {
        AppDispatcher.handleAction({
        	type: 'LOGIN-SUCCESS',
        	data: data
        });
    }

    static confirmCode(code) {
        AppDispatcher.handleAction({
        	type: 'LOGIN-CONFIRM',
        	code: code
        });
    }

    static demoLogin() {
        AppDispatcher.handleAction({
            type: 'LOGIN-DEMO'
        });
    }

}