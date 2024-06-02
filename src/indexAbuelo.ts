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


import { addObserver, appState } from './store/index';
import { loadCss } from './utils/styles';

import style from './indexAbuelo.css';

import './screens/export';

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

