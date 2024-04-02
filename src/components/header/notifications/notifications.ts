import { loadCss } from '../../../utils/styles';
import stylesNotifications from './notifications.css';

export enum AttributeNotifications {
	'photo' = 'photo',
	'name' = 'name',
	'texts' = 'texts',
}

class Notifications extends HTMLElement {
	name?: string;
	texts?: string;
	photo?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeNotifications, null> = {
			texts: null,
			name: null,
			photo: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(
		propName: AttributeNotifications,
		oldValue: string | undefined,
		newValue: string | undefined
	) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
		this.setupEventListeners();
	}

	setupEventListeners() {
		this.addEventListener('toggleNotifications', () => {
			this.toggleVisibility();
		});
	}
	toggleVisibility() {
		const section = this.shadowRoot?.querySelector('.section-notifications');
		if (section) {
			section.classList.toggle('hidden-notifications');
		}
	}

	/*<style>
			${stylesHeader}
			</style> */

	render() {
		if (this.shadowRoot) {
			loadCss(this, stylesNotifications);
			this.shadowRoot.innerHTML = `
			<style>
			${stylesNotifications}
			</style>


			<section class='section-notifications'class='hidden-notifications' id="myNotifications">

      <img src="${this.photo}">
      <p><strong>${this.name}</strong></p>
      <p>${this.texts}</p>

			</section>
      `;
		}

		const cssHeader = this.ownerDocument.createElement('style');
		cssHeader.innerHTML = stylesNotifications;
		this.shadowRoot?.appendChild(cssHeader);

		/*const imgLogo = document.createElement('img');
		imgLogo.innerHTML = logo;
		this.shadowRoot?.appendChild(imgLogo);

		const imgNotification = document.createElement('img');
		imgNotification.innerHTML = notification;
		this.shadowRoot?.appendChild(imgNotification);

		const imgPhoto = document.createElement('img');
		imgPhoto.innerHTML = photo;
		this.shadowRoot?.appendChild(imgPhoto);*/
	}
}

export default Notifications;
customElements.define('my-notifications', Notifications);