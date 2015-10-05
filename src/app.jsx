import React from 'react';
import Dashboard from './components/dashboard.jsx';
import Login from './components/login.jsx';
import SecondFactor from './components/2fa.jsx';
import AppSidebar from './components/sidebar.jsx';
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

        let isAuthenticated = this.state.step !== 'LOGIN' && this.state.step !== 'AUTH_SMS';
        
        const contentTranslate = 'translate3d(0, ' + this.state.distance + 'px, 0)';
        const contentStyle = {
            transform: contentTranslate,
            WebkitTransform: contentTranslate
        };

        const ptrTranslate = 'translate3d(0, ' + (this.state.distance - 48) + 'px, 0)'
        const ptrStyle = {
                transform: ptrTranslate,
                WebkitTransform: ptrTranslate
        };

        return (
            <div>
                <div className={isAuthenticated ? 'app-layout mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-drawer' : 'app-layout mdl-layout mdl-js-layout mdl-layout--fixed-header'}>

                    <header className="mdl-layout__header mdl-color--primary">
                        <div className="mdl-layout__header-row">
                          <h3 className="app-title">TRUST Material</h3>
                        </div>
                    </header>

                    {isAuthenticated ? <AppSidebar onLogout={this.handleLogout.bind(this)}/> : ''}

                    <main className={this.state.distance > 70 ? "mdl-layout__content mdl-color--blue-grey-900 ptr-active" : "mdl-layout__content mdl-color--blue-grey-900"}>
                    
                        <div className="pull-to-refresh" style={ptrStyle} ref="ptr">
                            <span className="arrow">&#8595;</span>
                        </div>

                        <div className="app-content mdl-color--grey-100"
                            style={contentStyle}
                            onTouchStart={this.handleTouchStart.bind(this)}
                            onTouchMove={this.handleTouchMove.bind(this)}
                            onTouchEnd={this.handleTouchEnd.bind(this)}>
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
React.initializeTouchEvents(true);
React.render(<App/>, el);