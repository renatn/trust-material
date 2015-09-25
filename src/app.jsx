import React from 'react';
import Dashboard from './components/dashboard.jsx';
import Login from './components/login.jsx';
import SecondFactor from './components/2fa.jsx';
import AppSidebar from './components/sidebar.jsx';

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

        let isAuthenticated = this.state.step !== 'LOGIN' && this.state.step !== 'AUTH_SMS';

        return (
            <div className={isAuthenticated ? 'is-authenticated' : 'is-not-authenticated'}>
                <div className="app-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">

                    <header className="mdl-layout__header mdl-color--primary">
                        <div className="mdl-layout__header-row">
                          <h3 className="app-title">TRUST Material</h3>
                        </div>
                    </header>

                    <AppSidebar onLogout={this.handleLogout.bind(this)} visible={isAuthenticated}/>

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
            </div>
        );
    }
}

var el = document.getElementById('app');
React.render(<App/>, el);