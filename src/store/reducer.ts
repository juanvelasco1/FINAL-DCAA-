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
		case 'SETUSER':
			return {
				...currentState,
				user: payload,
			};
		case 'SAVE_POST':
			currentState.user.saved.append(payload);
			return {
				...currentState,
			};
		case 'UNSAVE_POST':
			currentState.user.saved = currentState.user.saved.filter((item: any) => item !== payload);
			return {
				...currentState,
			};
		case 'GET_SAVED_POSTS':
			console.log('Posts guardados:', payload);
			return {
				...currentState,
				user: {
					...currentState.user,
					saved: payload,
				},
			};

		default:
			return currentState;
	}
};
