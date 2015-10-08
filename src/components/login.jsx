import React from 'react';
import Actions from '../actions/Actions.jsx';
import LoginStore from '../store/LoginStore.jsx';
import classNames from 'classnames';

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

        const username = this.refs.username.value,
              password = this.refs.password.value;

        if (!username || !password) {
            this.setState({
                submitted: true,
                errorMessage: ''
            });
            return;
        }

        Actions.login(username, password)
    }

    handleDemo(e) {
      e.preventDefault();
      Actions.demoLogin();
    }

    render() {
        const errorFrame = !!this.state.errorMessage ? <div className="mdl-cell mdl-cell--12-col login-error">{this.state.errorMessage}</div> : '';

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
                    <button className={classNames({'hidden': this.state.executing}, 'mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--primary', 'app-button--expand')} onClick={this.handleSubmit.bind(this)}>Войти</button>
                    <button className={classNames({'hidden': this.state.executing}, 'mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--accent')} onClick={this.handleDemo.bind(this)}>Демо-доступ</button>
                    <div id="p2" className={classNames({'hidden': !this.state.executing}, 'mdl-progress', 'mdl-js-progress', 'mdl-progress__indeterminate', 'login-progress')}></div>
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

