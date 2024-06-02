import { Profile } from './profile';

export type Observer = { render: () => void } & HTMLElement;

export interface AppStateType {
	screen: string;
	posts: Array<any>;
	notification: Array<any>;
	user: Array<any>;
	logedUserData: {
		email: string;
		password: string;
		confirmPassword: string;
		name: string;
	};
	// 	// something: {};
}

export enum ScreenActions {
	'NAVIGATE' = 'navigate',
	// 'HOME'= 'home',
	// 	'LOGIN'= 'login',
	// 	'SIGNUP'= 'signup',
	// 	'PROFILE'= 'profile',
	// 	'SAVED'= 'saved',
}



export type Actions = ScreenActions;
