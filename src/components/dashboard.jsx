import React from 'react';
import MainUtils from '../utils/MainUtils.js';

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        let main = JSON.parse(sessionStorage.getItem('main'));
        this.state = {
            cards: main.cards,
            accounts: main.accounts,
            deposits: main.deposits,
            transactions: main.pfm.transactions,
            activate: false
        }
    }

    componentDidMount() {
        setTimeout(function() {
            React.findDOMNode(this.refs.appSubView).classList.add("app-subview-enter-active");
        }.bind(this), 150);
    }

    render() {
        let cards = this.state.cards.map(function(card) {
            let currencySymbol = MainUtils.currencySymbol(card.currency);

            return (
                <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp product product-card" key={card.key}>
                        <div className="mdl-card__title mdl-card--expand">
                            <h4 className="mdl-card__title-text">
                                {card.alias}
                            </h4>
                            <h3 className="mdl-card__subtitle-text">
                                {card.number}
                            </h3>
                        </div>
                        <div className="mdl-card__supporting-text">
                            <span className="product__rest">{card.rest} {currencySymbol}</span>
                        </div>
                        <div className="mdl-card__actions mdl-card--border">
                            <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">Перевести</a>
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
        }.bind(this));

        let accounts = this.state.accounts.map(function(account) {
            let currencySymbol = MainUtils.currencySymbol(account.currency);

            return (
                <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp product product-account" key={account.key}>
                    <div className="mdl-card__title mdl-card--expand">
                        <h4 className="mdl-card__title-text">
                            {account.alias}
                        </h4>
                        <h3 className="mdl-card__subtitle-text">
                            {account.number}
                        </h3>
                    </div>
                    <div className="mdl-card__supporting-text">
                            <span className="product__rest">{account.rest} {currencySymbol}</span>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">Перевести</a>
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

        let deposits = this.state.deposits.map(function(deposit) {
            let currencySymbol = MainUtils.currencySymbol(deposit.currency);

            return (
                <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp product product-deposit" key={deposit.key}>
                    <div className="mdl-card__title mdl-card--expand">
                        <h4 className="mdl-card__title-text">
                            {deposit.alias}
                        </h4>
                        <h3 className="mdl-card__subtitle-text">
                            {deposit.number}
                        </h3>
                    </div>
                    <div className="mdl-card__supporting-text">
                            <span className="product__rest">{deposit.rest} {currencySymbol}</span>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent">Пополнить</a>
                    </div>

                    <div className="mdl-card__menu">
                        <button id={"deposit"+deposit.url} className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                            <i className="material-icons">share</i>
                        </button>
                        <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor={"deposit"+deposit.url} >
                          <li className="mdl-menu__item">Переименовать...</li>
                          <li className="mdl-menu__item">Свернуть</li>
                        </ul>
                    </div>
                </div>
            );
        });

        let transactions = this.state.transactions.slice(0, 10).map(function(transaction) {
            let currencySymbol = MainUtils.currencySymbol(transaction.transCurr);
            return (
                <div className="mdl-cell mdl-cell--12-col app-transaction" key={transaction.transDateTime}>
                    <div className="app-transaction-avatar">
                        <img src={'images/merchant/'+transaction.image}/>
                        <span>{transaction.transDateTime}</span>
                    </div>
                    <div className="app-transaction-title">
                        <h5>{transaction.title}</h5>
                        <div>{transaction.details}</div>
                    </div>
                    <div className="app-transaction-amount"><nobr>{this._formatAmount(transaction.transAmount)} {currencySymbol}</nobr></div>
                </div>
            );
        }.bind(this));

        return (
            <div className="mdl-grid app-subview-enter" ref="appSubView">
                <div className="mdl-cell mdl-cell--12-col">
                    <h3 className="login-heading">Мои финансы</h3>
                </div>
                {cards}
                {accounts}
                {deposits}

                <div className="app-transactions mdl-card mdl-cell mdl-cell--12-col mdl-shadow--2dp">
                    <div className="mdl-card__title">
                        <h4 className="login-heading">Последние операции</h4>
                        <div className="mdl-layout-spacer"></div>

                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                            <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="sample6">
                              <i className="material-icons">search</i>
                            </label>
                            <div className="mdl-textfield__expandable-holder">
                              <input className="mdl-textfield__input" type="text" id="sample6" />
                              <label className="mdl-textfield__label" htmlFor="sample-expandable">Expandable Input</label>
                            </div>
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

                    <div className="mdl-card__supporting-text">
                        {transactions}
                        <div className="mdl-typography--text-center">
                            <a href="" className="mdl-button mdl-js-button mdl-js-ripple-effect">Показать ещё</a>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

    _formatAmount(amount) {
        if (!amount) {
            return '';
        }
        let result = '' + amount;
        let dotPos = result.indexOf('.');
        if (dotPos + 2 === result.length) {
            return result + '0';
        } else {
            return result;
        }
    }
}
