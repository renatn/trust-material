import request from 'superagent';
import Actions from '../actions/Actions.jsx';

export default class API {

	static handleLoginResponse(response) {
		let errorMessage = '';
		if (response.ok) {
			if (response.body.error) {
			  errorMessage = response.body.error;
			} else {
			  Actions.successLogin(response.body);
			  return;
			}
		} else if (response.statusCode === 422)  {
		  errorMessage = ressponse.body.error;
		} else {
		  errorMessage = 'Интернет-банк временно не доступен. Скоро все будет ОК.';
		}
		Actions.loginError(errorMessage);
	}

	static authenticate(username, password) {
      request
        .post('/api/v1/sessions')
        .send('username='+username)
        .send('password='+password)
        .set('Accept', 'application/json')
        .end(function (err, res) {
          API.handleLoginResponse(res);
        });
	}

	static secondFactor(code, token) {
		request
	        .post('/api/v1/auth2')
	        .send('smsKey='+code)
	        .set('Accept', 'application/json')
	        .set('Authorization', token)
	        .end(function (err, res) {
				API.handleLoginResponse(res);
	        });

	}
}