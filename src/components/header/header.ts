import { loadCss } from '../../utils/styles';
import stylesHeader from './header.css';

export enum AttributeHeader {
	'logo' = 'logo',
	'notification' = 'notification',
	'photo' = 'photo',
}

class Header extends HTMLElement {
	logo?: string;
	notification?: string;
	photo?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeHeader, null> = {
			logo: null,
			notification: null,
			photo: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeHeader, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	/*<style>
			${stylesHeader}
			</style> */

	render() {
		if (this.shadowRoot) {
			loadCss(this, stylesHeader);
			this.shadowRoot.innerHTML = `
			<style>
			${stylesHeader}
			</style>
			<link rel="stylesheet" href="../src/Components/header/header.css">

			<section class='section-header'>
			<img src=${this.logo}>
			<img src=${this.notification}>
      <img src=${this.photo}>
			</section>
      `;
		}

		const cssHeader = this.ownerDocument.createElement('style');
		cssHeader.innerHTML = stylesHeader;
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

export default Header;
customElements.define('my-header', Header);
