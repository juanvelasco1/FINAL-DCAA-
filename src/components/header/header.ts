import {appState, dispatch} from '../../store';
import { redirect } from '../../store/actions';
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

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			loadCss(this, stylesHeader);
			this.shadowRoot.innerHTML += `
			<style>
			${stylesHeader}
			</style>

			<link rel="stylesheet" href="../src/Components/header/header.css">

			<section id='header' class='section-header px-4' >
			<img src=${this.logo} class='logo'>
			<div id='horizontalSpace'></div>


			<img src=${this.notification} class='notification' id="notification-button">
      <img id='profile-img' src=${appState.user?.photo} class='photo' >
			</section>
      `;
		}

		const ProfileImg = this.shadowRoot?.querySelector('#profile-img');

		ProfileImg?.addEventListener('click', () => {
			dispatch(redirect('profile'), true)
		})
		//const notifications.container
		const cssHeader = this.ownerDocument.createElement('style');
		cssHeader.innerHTML = stylesHeader;
		this.shadowRoot?.appendChild(cssHeader);

		const imgButton = this.shadowRoot?.getElementById('notification-button');
		//?.shadowRoot?//.getElementById('notifications-container');

		imgButton?.addEventListener('click', () => {
			const myCreatedSection = this.ownerDocument
				.querySelector('app-container')
				?.shadowRoot?.querySelector('app-home')
				?.shadowRoot?.getElementById('notifications-container');
			// console.log('Hola');
			console.log(myCreatedSection);
			// console.log(myCreatedSection);
			if (myCreatedSection?.className === 'hidden-notifications') {
				console.log('Mostrar');
				myCreatedSection.classList.add('section-notifications');
				myCreatedSection.classList.remove('hidden-notifications');
			} else if (myCreatedSection?.className === 'section-notifications') {
				console.log('Ocultar');
				myCreatedSection.classList.remove('section-notifications');
				myCreatedSection.classList.add('hidden-notifications');
			}
		});
	}
}
export default Header;
customElements.define('my-header', Header);
