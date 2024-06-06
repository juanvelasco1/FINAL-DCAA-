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

// export enum shoppingItemsActions {
// 	'GETSHOPPINGITEMS' = 'GETSHOPPINGITEMS',
// 	'SAVESHOPPINGITEMS' = 'SAVESHOPPINGITEMS',
// }

// export interface GetProductsAction {
// 	action: productsActions.GETPRODUCTS;
// 	payload: Product[];
// 	// Pick<AppState, 'something'>;
// }

export type Actions = ScreenActions;
