//padre
import './components/indexPadre';
import { Screens } from './types/navigation';
import { Profile } from './types/profile';

import { addObserver, appState } from './store/index';

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

		if (this.shadowRoot){ this.shadowRoot.innerHTML = '';
		loadCss(this, style)}
		switch (appState.screen) {
			case 'home': {
				const mainPageContainer = this.ownerDocument.createElement('div');
				mainPageContainer.setAttribute('id', 'mainPageContainer');

				const notificationsContainer = this.ownerDocument.createElement('section');
				notificationsContainer.className = 'hidden-notifications';
				notificationsContainer.id = 'notifications-container';

				this.header.forEach((home: any) => {
					mainPageContainer.appendChild(home);
				});

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
				this.shadowRoot?.appendChild(mainPageContainer);

				break;
			}

			case 'login':
				const login = this.ownerDocument.createElement('app-login');
				this.shadowRoot?.appendChild(login);
				break;

			case 'signup':
				const signup = this.ownerDocument.createElement('app-signup');
				this.shadowRoot?.appendChild(signup);
				break;
			default:
				break;
		}
	}
}

customElements.define('app-container', AppContainer);
