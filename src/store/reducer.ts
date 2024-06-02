

export const reducer = (currentAction: any, currentState: any) => {
	const { action, payload } = currentAction;
	switch (action) {
		case 'redirect':
			return {
				...currentState,
				screen: payload,
			};
		case 'NAVIGATE':
			return {
				...currentState,
				screen: payload,
			};
		case 'GETPOSTS':
			return {
				...currentState,
				posts: payload,
			};
		case 'STORAGE_USER_DATA':
			return {
				...currentState,
				logedUserData: payload,
			};
		// Puedes manejar otras acciones aquí si es necesario
		default:
			return currentState;
	}
};
