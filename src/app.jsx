import React from 'react';
import Dashboard from './components/dashboard.jsx';
import Login from './components/login.jsx';
import SecondFactor from './components/2fa.jsx';
import AppSidebar from './components/sidebar.jsx';
import PullToRefresh from './components/PullToRefresh.jsx';
import AppStore from './store/AppStore.jsx';
import Actions from './actions/Actions.jsx';

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
        Actions.logout();
    }

    handleTouchStart(e) {
        const touch = e.touches[0];
        if (document.body.scrollTop === 0) {
            this.setState({pull: true, from: touch.pageY});
        }
    }

    handleTouchMove(e) {
        const touch = e.touches[0];
        if (this.state.pull) {
            this.setState({
                distance: (touch.pageY - this.state.from) / 2.5
            });
        }
    }

    handleTouchEnd(e) {
        if (this.state.pull) {
            this.setState({pull: false, distance: 0});
        }
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

        const isAuthenticated = AppStore.isAuthenticated();

        return (
            <div className={isAuthenticated ? 'app-layout mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer' : 'app-layout mdl-layout mdl-js-layout mdl-layout--fixed-header'}>
                <header className="mdl-layout__header mdl-color--primary">
                    <div className="mdl-layout__header-row">
                      <h3 className="app-title">TRUST Material</h3>
                    </div>
                </header>

                {isAuthenticated ? <AppSidebar onLogout={this.handleLogout.bind(this)}/> : ''}

                <PullToRefresh>
                    {subView}
                </PullToRefresh>
            </div>
        );
    }

    _onChange() {
        this.setState(AppStore.getState());
    }
}

var el = document.getElementById('app');
React.initializeTouchEvents(true);
React.render(<App/>, el);