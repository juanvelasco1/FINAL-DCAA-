import { loadCss } from '../../utils/styles';
import stylesHeader from './header.css';

export enum AttributeHeader {
	'logo' = 'logo',
	'notification' = 'notification',
	'photo' = 'photo',
	'type' = 'type',
}

class Header extends HTMLElement {
	logo?: string;
	notification?: string;
	photo?: string;
	type?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeHeader, null> = {
			logo: null,
			notification: null,
			photo: null,
			type: null,
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

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			loadCss(this, stylesHeader);
			this.shadowRoot.innerHTML += `
			<style>
			${stylesHeader}
			</style>

			<link rel="stylesheet" href="../src/Components/header/header.css">

			<section id='header' class='section-header' >
			<img src=${this.logo} class='logo'>
			<div id='horizontalSpace'></div>
			<img src=${this.notification} class='notification'>
      <img src=${this.photo} class='photo' >
			</section>
      `;
		}

		const cssHeader = this.ownerDocument.createElement('style');
		cssHeader.innerHTML = stylesHeader;
		this.shadowRoot?.appendChild(cssHeader);

		const imgButton = this.shadowRoot?.querySelector('header');
		const myCreatedSection = this.ownerDocument
			.querySelector('app-container')
			?.shadowRoot?.querySelector('my-notifications')
			?.shadowRoot?.getElementById('myNotifications');

		if (this.type === 'noti') {
			imgButton?.addEventListener('click', () => {
				console.log('Hola');
				if (myCreatedSection?.className === 'hidden-notifications') {
					console.log(myCreatedSection);
					myCreatedSection.className = 'section-notifications';
				} else if (myCreatedSection?.className === 'section-notifications') {
					console.log(myCreatedSection);
					myCreatedSection.className = 'hidden-notifications';
				}
			});

			const myCloseCreatedSection = this.ownerDocument
				.querySelector('app-container')
				?.shadowRoot?.querySelector('my-notifications')
				?.shadowRoot?.getElementById('myNotifications');

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
}
export default Header;
customElements.define('my-header', Header);
