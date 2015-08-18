import React from 'react';
import request from 'superagent';

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
