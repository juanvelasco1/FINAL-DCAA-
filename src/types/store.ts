import { Profile } from './profile';

export type Observer = { render: () => void } & HTMLElement;

export interface AppStateType {
	appState: any;
	screen: string;
	posts: Array<any>;
	notification: Array<any>;
	user: string;
	logedUserData: {
		email: string;
		password: string;
		confirmPassword: string;
		name: string;
	};
}

export enum ScreenActions {
	'NAVIGATE' = 'navigate',
}

export type Actions = ScreenActions;
