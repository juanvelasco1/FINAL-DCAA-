import {reducer} from "./reducer";
import {Observer} from "../types/store";
import Storage from '../utils/storage';
import { PersistanceKeys } from '../utils/storage';
// import { Actions, AppState, Observer } from '../types/store';

export let appState = {
    screen: 'login',
} ;

let observers: any = [];

export const addObserver = (ref: any) => {
    observers = [...observers, ref];
}
export const dispatch = function (action: any) {
    const clone = JSON.parse(JSON.stringify(appState));
    // appState = reducer(action, clone);
    observers.forEach((observer: any) => observer.render());
}

