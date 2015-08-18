import React from 'react';

export default class AppSidebar extends React.Component {

    constructor(props) {
        super(props);
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.onLogout();
    }

    render() {

        return (
            <div className="mdl-layout__drawer mdl-color--blue-grey-900">
              <header className="app-drawer-header">
                  <img src="images/user.png" className="app-avatar"/>
                  <div className="app-avatar-dropdown">
                    <span>hello@example.com</span>
                    <div className="mdl-layout-spacer"></div>
                    <button id="accbtn" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                      <i className="material-icons" role="presentation">arrow_drop_down</i>
                      <span className="visuallyhidden">Accounts</span>
                    </button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="accbtn">
                      <li className="mdl-menu__item">Выход...</li>
                    </ul>
                  </div>
              </header>
              <nav className="mdl-navigation mdl-color--blue-grey-800 app-navigation">
                <a className="mdl-navigation__link" href="">
                  Рабочий стол
                </a>
                <a className="mdl-navigation__link" href="">Мои финансы</a>
                <a className="mdl-navigation__link" href="">Платежи переводы</a>
                <a className="mdl-navigation__link" href="">Предложения банка</a>
                <div className="mdl-layout-spacer"></div>
                <a className="mdl-navigation__link" href="" onClick={this.handleLogout.bind(this)}>Выход</a>
              </nav>
            </div>
        );
    }
}
