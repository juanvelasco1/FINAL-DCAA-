// import '../components/indexPadre';
// import { Actions, AppState, productsActions } from '../types/store';
// import { appState } from './index';

// export const reducer = (currentAction: Actions, currentState: AppState): AppState => {
// 	const { action, payload } = currentAction;

// 	switch (action) {
// 		case productsActions.GETPRODUCTS:
// 			return {
// 				...currentState,
// 				products: payload,
// 			};

// 		// case 'changedBackground':
// 		// 	currentState.background = playload;
// 		// 	break;
// 		default:
// 			return currentState;
// 	}
// };

export const reducer = (curentAction: any, currentState: any) => {
  const {action, payload} = curentAction;

  switch (action){
      case 'redirect':
          return {
              ...currentState,
              screen: payload
          }
      default:
          return currentState;

  case 'NAVIGATE':
    currentState.screen = payload;
    break;

  case 'GETPOSTS':
    currentState.posts = payload;
    break;

  case 'SETUSER':
    currentState.user = payload;
    break;
}
return currentState;
};