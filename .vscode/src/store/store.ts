import {reducer} from "./reducer";

export let appState = {
    screen: 'login',
} ;

let observers: any = [];

export const addObserver = (ref: any) => {
    observers = [...observers, ref];
}
export const dispatch = function (action: any) {
    const clone = JSON.parse(JSON.stringify(appState));
    appState = reducer(action, clone);
    observers.forEach((observer: any) => observer.render());
}

