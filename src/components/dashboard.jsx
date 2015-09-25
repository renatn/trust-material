import React from 'react';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        let main = JSON.parse(sessionStorage.getItem('main'));
        this.state = {
            cards: main.cards,
            accounts: main.accounts,
            transactions: main.pfm.transactions,
            activate: false
        }
    }

    componentDidMount() {
        setTimeout(function(){
            React.findDOMNode(this.refs.appSubView).classList.add("app-subview-enter-active");
        }.bind(this), 150);
    }

    render() {
        let cards = this.state.cards.map(function(card) {
            return (
                <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp product-card" key={card.key}>
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
                            <button id={"card"+card.url} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                                <i className="material-icons">share</i>
                            </button>
                            <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor={"card"+card.url} >
                              <li className="mdl-menu__item">Переименовать...</li>
                              <li className="mdl-menu__item">Свернуть</li>
                            </ul>
                        </div>
                </div>
            );
        });

        let accounts = this.state.accounts.map(function(account) {
            return (
                <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp product-account" key={account.key}>
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
                        <button id={"account"+account.url} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                            <i className="material-icons">share</i>
                        </button>
                        <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor={"account"+account.url} >
                          <li className="mdl-menu__item">Переименовать...</li>
                          <li className="mdl-menu__item">Свернуть</li>
                        </ul>
                    </div>
                </div>
            );
        });

        let transactions = this.state.transactions.slice(0, 10).map(function(transaction) {
            return (
                <div className="mdl-cell mdl-cell--12-col app-transaction">
                    <div className="app-transaction-avatar"><img src={'images/merchant/'+transaction.image}/></div>
                    <div className="">{transaction.transDateTime}</div>
                    <div className="app-transaction-title">
                        <h5>{transaction.title}</h5>
                        <div>{transaction.details}</div>
                    </div>
                    <div className="app-transaction-amount">{transaction.transAmount}</div>
                </div>
            );
        });

        return (
            <div className="mdl-grid app-subview-enter" ref="appSubView">
                <div className="mdl-cell mdl-cell--12-col">
                    <h3 className="login-heading">Мои финансы</h3>
                </div>
                {cards}
                {accounts}

                <div className="app-transactions mdl-card mdl-cell mdl-cell--12-col mdl-shadow--2dp">
                    <div className="mdl-card__title">
                        <h4 className="login-heading">Последние операции</h4>
                    </div>

                    <div className="mdl-card__supporting-text">
                        {transactions}
                    </div>

                    <button id="transactions-list-menu" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                        <i className="material-icons">more_vert</i>
                    </button>
                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
                        htmlFor="transactions-list-menu">
                      <li className="mdl-menu__item">Some Action</li>
                      <li className="mdl-menu__item">Another Action</li>
                      <li disabled className="mdl-menu__item">Disabled Action</li>
                      <li className="mdl-menu__item">Yet Another Action</li>
                    </ul>
                </div>
            </div>
        );
    }
}
