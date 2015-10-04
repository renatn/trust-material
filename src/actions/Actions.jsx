import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import API from '../utils/API.js';

export default class Actions {
  
    static login(username, password) {
        AppDispatcher.handleAction({
        	type: 'LOGIN'
        });
        API.authenticate(username, password);
    }

    static logout() {
        AppDispatcher.handleAction({
            type: 'LOGOUT'
        });
    }

    static loginError(message) {
        AppDispatcher.handleAction({
        	type: 'LOGIN-ERROR',
        	message: message
        });
    }

    static successLogin(data) {
        AppDispatcher.handleAction({
        	type: 'LOGIN-SUCCESS',
        	data: data
        });
    }

    static confirmCode(code, token) {
        AppDispatcher.handleAction({
        	type: 'LOGIN-CONFIRM'
        });
        API.secondFactor(code, token);
    }

    static demoLogin() {
        AppDispatcher.handleAction({
            type: 'LOGIN-DEMO'
        });
    }

}