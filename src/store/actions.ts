// import '../data/userData';

// import { productsActions, GetProductsAction } from '../types/store';

// export const getProductsAction = async (): Promise<GetProductsAction> => {
// 	const data = await getProducts();
// 	return {
// 		action: productsActions.GETPRODUCTS,
// 		payload: data,
// 	};
// };

import { Screens } from '../types/navigation';
import { getPosts } from '../utils/firebase';
import { Actions } from '../types/store';
import firebase from "firebase/compat";
import User = firebase.User;
import {personalUser} from "../types/users";

export const redirect = (payload: any) => {
	return {
		action: 'redirect',
		payload: payload,
	};
};
export const navigate = (screen: Screens) => {
	return {
		type: 'NAVIGATE',
		payload: screen,
	};
};

export const getPostsAction = async () => {
	//Ir al utils de firebase y ejecutar la función getPosts
	const posts = await getPosts();
	return {
		action: 'GETPOSTS',
		payload: posts,
	};
};

// export const getProfileAction = async () => {
// 	//Ir al utils de firebase y ejecutar la función getPosts
// 	const profile = await getProfile();
// 	return {
// 		action: 'GETPROFILE',
// 		payload: profile,
// 	};
// };

export const storageUserData = (userData: any) => {
	return {
		action: 'STORAGE_USER_DATA',
		payload: userData,
	};
};



// export const getUsers = () => {
//   return
// };

// export const getPostsAction = async () => {
// 	//Ir al utils de firebase y ejecutar la función getPosts
// 	const posts = await getPosts();
// 	return {
// 		action: 'GETPOSTS',
// 		payload: posts,
// 	};
// };

// export const navigate = (screen:Screens) => {
// 	return {
// 		action: 'NAVIGATE',
// 		payload: screen,
// 	};
// };

export const setUserCredentials = (user: personalUser) => {
 	return {
 		action: 'SETUSER',
 		payload: user,
	};
};
