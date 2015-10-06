import React from 'react';

export default class PullToRefresh extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pull: false,
            distance: 0,
            from: 0,
            refresh: false,
            loading: false
        };
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
            e.preventDefault();
            const distance = (touch.pageY - this.state.from) / 2.5;
            this.setState({
                distance: distance,
                refresh: distance > 60
            });
        }
    }

    handleTouchEnd(e) {
        if (this.state.pull) {
            if (this.state.refresh) {
                this.setState({loading: true, distance: 60});
                setTimeout(function() {
                    this._reset();
                }.bind(this), 2000);
            } else {
                this._reset();
            }
        }
    }

    render() {
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
            <main className={this.state.refresh ? "mdl-layout__content ptr-active" : "mdl-layout__content"}>
                <div className="pull-to-refresh" style={ptrStyle} ref="ptr">
                    {this.state.loading ? <i className="material-icons spin">sync</i>: <i className="material-icons">arrow_forward</i>}
                </div>

                <div className="app-content"
                    style={contentStyle}
                    onTouchStart={this.handleTouchStart.bind(this)}
                    onTouchMove={this.handleTouchMove.bind(this)}
                    onTouchEnd={this.handleTouchEnd.bind(this)}>
                    {this.props.children}
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
        );
    }

    _reset() {
        this.setState({
            pull: false,
            distance: 0,
            refresh: false,
            loading: false
        });
    }

}