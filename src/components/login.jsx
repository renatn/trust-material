import React from 'react';
import Actions from '../actions/Actions.jsx';
import LoginStore from '../store/LoginStore.jsx';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = LoginStore.getState();
    }

    componentDidMount() {
        LoginStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this._onChange.bind(this));
    }

    handleSubmit(e) {
        e.preventDefault();

        let usernameInput = React.findDOMNode(this.refs.username),
            passwordInput = React.findDOMNode(this.refs.password);

        if (!usernameInput.value || !passwordInput.value) {
            this.setState({
                submitted: true,
                errorMessage: ''
            });
            return;
        }

        Actions.login(usernameInput.value, passwordInput.value)
    }

    handleDemo(e) {
      e.preventDefault();

      Actions.demoLogin();
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
                    <button className={this.state.executing ? 'hidden' : 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary app-button--expand'} onClick={this.handleSubmit.bind(this)}>Войти</button>
                    <button className={this.state.executing ? 'hidden' : 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'} onClick={this.handleDemo.bind(this)}>Демо-доступ</button>
                    <div id="p2" className={this.state.executing? 'mdl-progress mdl-js-progress mdl-progress__indeterminate login-progress' : 'mdl-progress mdl-js-progress mdl-progress__indeterminate login-progress hidden'}></div>
                </div>
              </div>
            </div>
          </form>
        );
    }

    _onChange() {
        this.setState(LoginStore.getState());
    }
}

