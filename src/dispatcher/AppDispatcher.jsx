import {Dispatcher} from 'flux';

let AppDispatcher = new Dispatcher(); 

AppDispatcher.handleAction = function(action) {

	let payload = {
		source: 'VIEW_ACTION',
		action: action
	}

	this.dispatch(payload);
}

export default AppDispatcher;