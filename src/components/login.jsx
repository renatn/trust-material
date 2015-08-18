import React from 'react';
import request from 'superagent';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            submitted: false,
            errorMessage: '',
            executing: false
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        let usernameInput = React.findDOMNode(this.refs.username),
            passwordInput = React.findDOMNode(this.refs.password);

        this.setState({
            submitted: true,
            errorMessage: ''
        });

        if (!usernameInput.value || !passwordInput.value) {
            return;
        }

        this.setState({executing: true});
        request
            .post('/api/v1/sessions')
            .send('username='+usernameInput.value)
            .send('password='+passwordInput.value)
            .end(function (err, res) {
                if (res.ok) {
                    if (res.body.error) {
                        this.setState({errorMessage: res.body.error});
                    } else {
                        this.props.onSuccessLogin(res.body);
                        return;
                    }
                } else {
                    this.setState({errorMessage: 'Интернет-банк временно не доступен. Скоро все будет ОК.'});
                }
                passwordInput.value = '';
                usernameInput.value = '';
                this.setState({executing: false});
            }.bind(this));
    }

    render() {

        let errorFrame = !!this.state.errorMessage ? <div className="mdl-cell mdl-cell--12-col login-error">{this.state.errorMessage}</div> : '';

        return (
          <form action="#" method="POST">
            <div className="mdl-grid">

              <div className="mdl-cell mdl-cell--12-col">
                <h4 className="login-heading">Вход в интернет-банк</h4>
              </div>

              {errorFrame}

              <div className="mdl-cell mdl-cell--12-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input login-input"
                       type="text"
                       id="username1"
                       ref="username"/>
                <label className="mdl-textfield__label login-label" htmlFor="username1">Логин...</label>
              </div>

              <div className="mdl-cell mdl-cell--12-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input login-input"
                       type="password"
                       id="password1"
                       ref="password"/>
                <label className="mdl-textfield__label login-label" htmlFor="password1">Пароль...</label>
              </div>

              <div className="mdl-cell mdl-cell--12-col">
                <div className="login-actions">
                    <button className={this.state.executing ? 'hidden' : 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent app-button--expand'} onClick={this.handleSubmit.bind(this)}>Войти</button>
                    <div id="p2" className={this.state.executing? 'mdl-progress mdl-js-progress mdl-progress__indeterminate login-progress' : 'mdl-progress mdl-js-progress mdl-progress__indeterminate login-progress hidden'}></div>
                </div>
              </div>
            </div>
          </form>
        );
    }
}

