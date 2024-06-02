

import { Screens } from '../types/navigation';
import { getPosts } from '../utils/firebase';
import { Actions } from '../types/store';

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


export const storageUserData = (userData: any) => {
	return {
		action: 'STORAGE_USER_DATA',
		payload: userData,
	};
};


