import React from 'react';
import AppSidebar from './sidebar.jsx';
import Dashboard from './dashboard.jsx';
import Login from './login.jsx';

class AppHeader extends React.Component {

    render() {
        return (
            <header className="mdl-layout__header mdl-color--primary">
                <div className="mdl-layout__header-row">
                  <h3 className="app-title">TRUST Online</h3>
                </div>
            </header>
        );
    }
}

class SecondFactor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            errorMessage: '',
            executing: false
        };
    }

    componentDidMount() {
        setTimeout(function() {
            React.findDOMNode(this.refs.appSubView).classList.add("app-subview-enter-active");
        }.bind(this), 150);
    }


    handleSubmit(e) {
        e.preventDefault();

        let confirmCodeInput = React.findDOMNode(this.refs.confirmCode);

        this.setState({
            submitted: true,
            errorMessage: ''
        });

        if (!confirmCodeInput.value) {
            return;
        }

        this.setState({executing: true});
        request
            .post('/api/v1/auth2')
            .send('smsKey='+confirmCodeInput.value)
            .set('Authorization', this.props.token)
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
                confirmCodeInput.value = '';
                this.setState({executing: false});
            }.bind(this));
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
}


class App extends React.Component {

    constructor(props) {
        super(props);

        let step = 'LOGIN',
            token = null;
        let tokenExpire = parseInt(sessionStorage.getItem('token_expire'), 10);
        if (!isNaN(tokenExpire) && tokenExpire > Date.now()) {
            token = sessionStorage.getItem('token');
            step = sessionStorage.getItem('next');
        }

        this.state = {
            step: step,
            token: token
        };
    }

    componentDidUpdate() {
        componentHandler.upgradeDom();
    }

    handleSuccessLogin(response) {

        sessionStorage.setItem('next', response.next);
        sessionStorage.setItem('token', response.sessionKey);
        sessionStorage.setItem('token_expire', (Date.now() + (8 * 60 * 1000)).toString());

        if (response.next === 'AUTH_SMS') {
        } else if (response.next === 'MAIN' || response.next === 'INSTR') {
            sessionStorage.setItem('main', JSON.stringify(response));
        } else if (response.next === 'LICENCE') {
            sessionStorage.setItem('license', response.licence);
        }

        this.setState({
            token: response.sessionKey,
            step: response.next
        });

    }

    handleLogout() {
        sessionStorage.clear();
        this.setState({step: 'LOGIN'});
        window.location.reload();
    }

    render() {

        let subView;
        if (this.state.step === 'LOGIN') {
            subView = <Login onSuccessLogin={this.handleSuccessLogin.bind(this)} />;
        } else if (this.state.step === 'MAIN') {
            subView = <Dashboard/>;
        } else if (this.state.step === 'AUTH_SMS') {
            subView = <SecondFactor onSuccessLogin={this.handleSuccessLogin.bind(this)} token={this.state.token}/>;
        } else {
            subView = <h1>Fail</h1>;
        }

        let sideBar = this.state.step === 'LOGIN' ||  this.state.step === 'AUTH_SMS' ? '' :  <AppSidebar onLogout={this.handleLogout.bind(this)}/>;

        return (
            <div className="app-layout mdl-layout  mdl-js-layout mdl-layout--fixed-header">
                <AppHeader/>

                {sideBar}

                <main className="mdl-layout__content">
                  <div className="app-content">
                    {subView}
                  </div>

                  <div className="mdl-layout-spacer"></div>
                  <footer className="mdl-mini-footer">
                    <div className="mdl-mini-footer--left-section">
                      <div className="mdl-logo">&copy; 2015</div>
                      <ul className="mdl-mini-footer--link-list">
                        <li><a href="#">Помощь</a></li>
                        <li><a href="#">Правила использования</a></li>
                      </ul>
                    </div>
                  </footer>
                </main>
            </div>
        );
    }
}

var el = document.getElementById('app');
React.render(<App/>, el);