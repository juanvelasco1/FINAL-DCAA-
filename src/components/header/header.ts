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

		/*const myNotifications = document.querySelector('my-notifications');
		const imgNotification = this.shadowRoot?.getElementById('myNotifications');

		if (imgNotification && myNotifications) {
			imgNotification.addEventListener('click', () => {
				if (myNotifications.classList.contains('hidden-notifications')) {
					myNotifications.classList.remove('hidden-notifications');
				} else {
					myNotifications.classList.add('hidden-notifications');
				}
			});*/

		const notiButton = this.shadowRoot?.querySelector('section');
		const myCreatedNoti = this.ownerDocument
			.querySelector('app-container')
			?.shadowRoot?.querySelector('my-notifications')
			?.shadowRoot?.getElementById('myNotifications');

		//	if (this.type === 'noti') {
		if (this.notification === '../asset/notifications.png') {
			notiButton?.addEventListener('click', () => {
				console.log('Hola');
				if (myCreatedNoti?.className === 'hidden-notifications') {
					console.log(myCreatedNoti);
					myCreatedNoti.className = 'section-notifications';
				} else if (myCreatedNoti?.className === 'section-notifications') {
					console.log(myCreatedNoti);
					myCreatedNoti.className = 'hidden-notifications';
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
