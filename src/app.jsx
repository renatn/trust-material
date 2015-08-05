import React from 'react';
import request from 'superagent';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            username: '',
            password: '',
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
            username: usernameInput.value,
            password: passwordInput.value,
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
                    <button className={this.state.executing ? 'hidden' : 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent app-button--sm'} onClick={this.handleSubmit.bind(this)}>Войти</button>
                    <div id="p2" className={this.state.executing? 'mdl-progress mdl-js-progress mdl-progress__indeterminate login-progress' : 'mdl-progress mdl-js-progress mdl-progress__indeterminate login-progress hidden'}></div>
                    <div className="mdl-layout-spacer"></div>
                    <a href="#">Забыли пароль?</a>
                </div>
              </div>
            </div>
          </form>
        );
    }
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        let main = JSON.parse(sessionStorage.getItem('main'));
        this.state = {
            cards: main.cards,
            accounts: main.accounts
        }
    }

    render() {
        let cards = this.state.cards.map(function(card) {
            return (
                <div className="mdl-cell mdl-cell--4-col" key={card.key}>
                    <div className="mdl-card mdl-shadow--2dp product-card">
                        <div className="mdl-card__title mdl-card--expand">
                            <h4 className="mdl-card__title-text">
                                {card.alias}
                            </h4>
                            <h3 className="mdl-card__subtitle-text">
                                {card.number}
                            </h3>
                        </div>
                        <div className="mdl-card__supporting-text">
                            <span className="product__rest">{card.rest} P</span>
                        </div>
                        <div className="mdl-card__actions mdl-card--border">
                            <a hre="#">Перевести</a>
                        </div>
                        <div className="mdl-card__menu">
                            <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                <i className="material-icons">share</i>
                            </button>
                        </div>
                    </div>
                </div>
            );
        });

        let accounts = this.state.accounts.map(function(account) {
            return (
                <div className="mdl-cell mdl-cell--4-col" key={account.key}>
                    <div className="mdl-card mdl-shadow--2dp product-account">
                        <div className="mdl-card__title mdl-card--expand">
                            <h4 className="mdl-card__title-text">
                                {account.alias}
                            </h4>
                            <h3 className="mdl-card__subtitle-text">
                                {account.number}
                            </h3>
                        </div>
                        <div className="mdl-card__supporting-text">
                                <span className="product__rest">{account.rest} P</span>
                        </div>
                        <div className="mdl-card__actions mdl-card--border">
                            <a hre="#">Перевести</a>
                        </div>

                        <div className="mdl-card__menu">
                            <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                <i className="material-icons">share</i>
                            </button>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--12-col">
                    <h3 className="login-heading">Мои финансы</h3>
                </div>
                {cards}
                {accounts}
            </div>
        );
    }
}

class App extends React.Component {

    constructor(props) {
        super(props);

        var step = 'LOGIN';
        var tokenExpire = parseInt(sessionStorage.getItem('token_expire'), 10);
        if (!isNaN(tokenExpire) && tokenExpire > Date.now()) {
            step = 'MAIN';
        }

        this.state = {
            step: step,
            token: ''
        };

    }

    handleSuccessLogin(response) {
        if (response.next === 'AUTH_SMS') {
            return;
        }

        sessionStorage.setItem('token', response.sessionKey);
        sessionStorage.setItem('token_expire', (Date.now() + (8 * 60 * 1000)).toString());

        if (response.next === 'MAIN' || response.next === 'INSTR') {
            sessionStorage.setItem('main', JSON.stringify(response));
        } else if (response.next === 'LICENCE') {
            sessionStorage.setItem('license', response.licence);
        }

        this.setState({
            token: response.sessionKey,
            step: response.next
        });
    }

    render() {
        if (this.state.step === 'LOGIN') {
            return (<Login onSuccessLogin={this.handleSuccessLogin.bind(this)} />);
        } else if (this.state.step === 'MAIN') {
            return (<Dashboard/>);
        } else {
            return (<h1>Fail</h1>);
        }
    }

}

var el = document.getElementById('app');
React.render(<App/>, el);