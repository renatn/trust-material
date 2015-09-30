import React from 'react';
import request from 'superagent';
import LoginStore from '../store/LoginStore.jsx';
import Actions from '../actions/Actions.jsx';

export default class SecondFactor extends React.Component {

    constructor(props) {
        super(props);
        this.state = LoginStore.getState();
    }

    componentDidMount() {
        setTimeout(function() {
            React.findDOMNode(this.refs.appSubView).classList.add("app-subview-enter-active");
        }.bind(this), 150);
        LoginStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this._onChange.bind(this));
    }
   
    handleSubmit(e) {
        e.preventDefault();

        let confirmCodeInput = React.findDOMNode(this.refs.confirmCode);
        if (!confirmCodeInput.value) {
            this.setState({
                submitted: true,
                errorMessage: ''
            });
            return;
        }

        Actions.confirmCode(confirmCodeInput.value);
    }

    render() {
        let errorFrame = !!this.state.errorMessage ? <div className="mdl-cell mdl-cell--12-col login-error">{this.state.errorMessage}</div> : '';

        return (
          <form action="#" method="POST">
            <div className="mdl-grid app-subview-enter" ref="appSubView">

              <div className="mdl-cell mdl-cell--12-col">
                <h4 className="login-heading">Вход в интернет-банк</h4>
              </div>

              {errorFrame}

              <div className="mdl-cell mdl-cell--12-col mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                <input className="mdl-textfield__input login-input"
                       type="text"
                       id="confirmCode1"
                       ref="confirmCode"/>
                <label className="mdl-textfield__label login-label" htmlFor="confirmCode1">Временный пароль...</label>
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

    _onChange() {
        this.setState(LoginStore.getState());
    }

}
