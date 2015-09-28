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
            <div className={this.props.visible ? "mdl-layout__drawer mdl-color--blue-grey-900" : "mdl-layout__drawer mdl-color--blue-grey-900 hidden"}>
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
                  <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>
                  Рабочий стол
                </a>
                <a className="mdl-navigation__link" href="">
                  <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">account_balance_wallet</i>
                  Мои финансы
                </a>
                <a className="mdl-navigation__link" href="">
                  <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">shopping_cart</i>
                  Платежи переводы
                </a>
                <a className="mdl-navigation__link" href="">
                  <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">local_offer</i>
                  Предложения банка
                </a>
                <div className="mdl-layout-spacer"></div>
                <a className="mdl-navigation__link" href="" onClick={this.handleLogout.bind(this)}>
                  <i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">exit_to_app</i>
                  Выход
                </a>
              </nav>
            </div>
        );
    }
}
