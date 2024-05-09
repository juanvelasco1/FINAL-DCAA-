import { Profile } from './profile';

export type Observer = { render: () => void } & HTMLElement;



// export type AppState = {
// 	screenProfile: Profile[];

// 	// something: {};
// };

export enum Actions {
'HOME'= 'home',
	'LOGIN'= 'login',
	'SIGNUP'= 'signup',
	'PROFILE'= 'profile',
	'SAVED'= 'saved',
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

// export type Actions = GetProductsAction;
