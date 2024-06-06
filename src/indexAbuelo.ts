//padre
import './components/indexPadre';
import { Screens } from './types/navigation';
import { Profile } from './types/profile';
import { postsTypes } from './types/post';
import { createTypes } from './types/create';
import { usersTypes } from './types/users';
import { headerTypes } from './types/header';
import { notificationsTypes } from './types/notifications';
import { sectionsTypes } from './types/sections';
import { tagsTypes } from './types/tags';


import {addObserver, appState, dispatch} from './store/index';
import { loadCss } from './utils/styles';
import { auth } from './utils/firebase'
import style from './indexAbuelo.css';

import './screens/export';
import {setUserCredentials} from "./store/actions";

class AppContainer extends HTMLElement {
	header: HTMLElement[] = [];
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		console.log(appState);

		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			loadCss(this, style);
		}
		switch (appState.screen) {
			case 'login':
				const login = this.ownerDocument.createElement('app-login');
				this.shadowRoot?.appendChild(login);
				break;

			case 'signup':
				const signup = this.ownerDocument.createElement('app-signup');
				this.shadowRoot?.appendChild(signup);
				break;

			case 'home':
				dispatch(setUserCredentials({name: auth.currentUser?.displayName || "", email: auth.currentUser?.email || "", photo: auth.currentUser?.photoURL || ""}), false)
				const home = this.ownerDocument.createElement('app-home');
				this.shadowRoot?.appendChild(home);
				break;

			case 'profile':
				const profile = this.ownerDocument.createElement('app-profile');
				this.shadowRoot?.appendChild(profile);
				break;

			case 'saved':
				const saved = this.ownerDocument.createElement('app-saved');
				this.shadowRoot?.appendChild(saved);
				break;
		}
	}
}

customElements.define('app-container', AppContainer);

// switch (appState.screen) {
// 	case 'home':
// 		{
// const mainPageContainer = this.ownerDocument.createElement('div');
// mainPageContainer.setAttribute('id', 'mainPageContainer');

// const notificationsContainer = this.ownerDocument.createElement('section');
// notificationsContainer.className = 'hidden-notifications';
// notificationsContainer.id = 'notifications-container';

// this.header.forEach((home: any) => {
// 	mainPageContainer.appendChild(home);
// });

/*this.create.forEach((home) => {
					console.log(home);
					mainPageContainer.appendChild(home);
				});*/

/*this.notifications.forEach((home) => {
					console.log(home);
					notificationsContainer.appendChild(home);
				});*/

// mainPageContainer.appendChild(notificationsContainer);

/*const navBar = this.ownerDocument.createElement('nav-bar') as NavBar;
				mainPageContainer.appendChild(navBar);*/

/* const postContainer = this.ownerDocument.createElement('div');
				postContainer.className = "post-container"; */

/*const post = this.ownerDocument.createElement('my-post') as Post;
				post.className = "post-container";
				postContainer.appendChild(post)
				mainPageContainer.appendChild(postContainer);*/
// 	this.shadowRoot?.appendChild(mainPageContainer);

// 	break;
// }
