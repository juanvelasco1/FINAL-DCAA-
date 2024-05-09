// import '../data/userData';

// import { productsActions, GetProductsAction } from '../types/store';

// export const getProductsAction = async (): Promise<GetProductsAction> => {
// 	const data = await getProducts();
// 	return {
// 		action: productsActions.GETPRODUCTS,
// 		payload: data,
// 	};
// };

import{Screens} from '../types/navigation'
import { getPosts } from '../utils/firebase';

export const redirect = (payload: any) => {
	return {
		action: 'redirect',
		payload: payload,
	};
};

// export const getUsers = () => {
//   return
// };

export const getPostsAction = async () => {
	//Ir al utils de firebase y ejecutar la función getPosts
	const posts = await getPosts();
	return {
		action: 'GETPOSTS',
		payload: posts,
	};
};

export const navigate = (screen:Screens) => {
	return {
		action: 'NAVIGATE',
		payload: screen,
	};
};

export const setUserCredentials = (user: string) => {
	return {
		action: 'SETUSER',
		payload: user,
	};
};