import React from 'react';
import Dashboard from './components/dashboard.jsx';
import Login from './components/login.jsx';
import SecondFactor from './components/2fa.jsx';
import AppSidebar from './components/sidebar.jsx';
import AppStore from './store/AppStore.jsx';

class App extends React.Component {

    constructor(props) {
        super(props);        
        this.state = AppStore.getState();
    }

    componentDidMount() {
        AppStore.addChangeListener(this._onChange.bind(this));
    }

    componentDidUpdate() {
        componentHandler.upgradeDom();
    }

    handleLogout() {
        sessionStorage.clear();
        this.setState({step: 'LOGIN'});
        window.location.reload();
    }

    render() {

        let subView;
        if (this.state.step === 'LOGIN') {
            subView = <Login/>;
        } else if (this.state.step === 'MAIN') {
            subView = <Dashboard/>;
        } else if (this.state.step === 'AUTH_SMS') {
            subView = <SecondFactor token={this.state.token}/>;
        } else {
            subView = <h1>Fail</h1>;
        }

        let isAuthenticated = this.state.step !== 'LOGIN' && this.state.step !== 'AUTH_SMS';

        return (
            <div className={isAuthenticated ? 'is-authenticated' : 'is-not-authenticated'}>
                <div className={isAuthenticated ? 'app-layout mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer' : 'app-layout mdl-layout mdl-js-layout mdl-layout--fixed-header'}>

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

    _onChange() {
        this.setState(AppStore.getState());
    }
}

var el = document.getElementById('app');
React.render(<App/>, el);