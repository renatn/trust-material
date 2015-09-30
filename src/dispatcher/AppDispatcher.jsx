import {Dispatcher} from 'flux';

let AppDispatcher = new Dispatcher(); 

AppDispatcher.handleAction = function(action) {

	let payload = {
		source: 'VIEW_ACTION',
		action: action
	}

	if (this.isDispatching()) {
		setTimeout(() => {
			this.dispatch(payload);
		}, 0);
	} else {
		this.dispatch(payload);		
	}
}

export default AppDispatcher;