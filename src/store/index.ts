import { reducer } from './reducer';
import { Screens } from '../types/navigation';
import { Actions, AppStateType, Observer } from '../types/store';
import {onAuthStateChanged} from "firebase/auth";
import {auth, getPosts, getSavedPosts} from '../utils/firebase'
import { getSavedPostsAction, redirect, setUserCredentials} from "./actions";
import firebase from "firebase/compat";
import User = firebase.User;
import {personalUser} from "../types/users";


// import {Observer} from "../types/store";
// import Storage from '../utils/storage';
// import { PersistanceKeys } from '../utils/storage';
// import { Actions, AppState, Observer } from '../types/store';

onAuthStateChanged(auth, async (user) => {

	if (user) {
		console.log(user)
		if (user.uid && user.displayName && user.email && user.photoURL) {
			const data = {
				name: user.displayName,
				email: user.email,
				photo: user.photoURL,
			}
			dispatch(setUserCredentials(data), true)
			const posties = getSavedPosts();
			appState.user.saved = await posties;
			appState.posts = await getPosts();
		}
		dispatch(redirect('home'), true)
	} else {
		dispatch(redirect('login'), true)
	}

	dispatch(getPosts(), true);

})

const emptyState: {
	notification: any[];
	screen: string;
	posts: any[];
	user: personalUser;
	logedUserData: { password: string; name: string; confirmPassword: string; email: string }
} = {
	screen: 'login',
	posts: [],
	notification: [],
	user: {
		name: '',
		email: '',
		photo: '',
		saved: []
	},
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
