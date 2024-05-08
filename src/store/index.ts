import { reducer } from './reducer';
import { Screens } from '../types/navigation';
import { Observer } from '../types/store';

// import {Observer} from "../types/store";
// import Storage from '../utils/storage';
// import { PersistanceKeys } from '../utils/storage';
// import { Actions, AppState, Observer } from '../types/store';

const emptyState = {
	screen: Screens.LOGIN,
	user: [],
};

export let appState = emptyState;

let observers: Observer[] = [];

const notifyObservers = () => observers.forEach((o) => o.render());

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};
export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	// appState = reducer(action, clone);
	// observers.forEach((observer: any) => observer.render());
	appState = newState;
	notifyObservers();
};