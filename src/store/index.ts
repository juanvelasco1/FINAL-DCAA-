import { reducer } from './reducer';
import { Screens } from '../types/navigation';
import { Actions, AppStateType, Observer } from '../types/store';

const emptyState: AppStateType = {
	screen: 'profile',
	posts: [],
	notification: [],
	user: [],
	// user: [],
	logedUserData: {
		email: '',
		password: '',
		confirmPassword: '',
		name: '',
	},
};

export let appState = emptyState;

let observers: Observer[] = [];

const notifyObservers = () => observers.forEach((o) => o.render());

export const dispatch = (action: any, reload: boolean) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	// appState = reducer(action, clone);
	// observers.forEach((observer: any) => observer.render());
	appState = newState;
	if (reload) {
		notifyObservers();
	}
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};
