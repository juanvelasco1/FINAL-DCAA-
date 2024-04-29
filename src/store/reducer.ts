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
    }
}