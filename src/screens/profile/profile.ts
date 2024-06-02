//import Datas

import { userData } from '../../data/userData';

//import Components

import MyContact, { AttributeContact } from '../../components/contactInfo/contactInfo';

import * as styles from './styles.css';
import { loadCss } from '../../utils/styles';
import stylesProfile from './profile.css';
//Importar estilos
import styleProfile from './profile.css';

import { addObserver, appState } from '../../store/index';
import ContactInfo from '../../components/contactInfo/contactInfo';
// import './components/indexPadre';
import { dispatch } from '../../store';
import { redirect } from '../../store/actions';

import { getPostsAction } from '../../store/actions';
import { headerData } from '../../data/headerData';
import MyHeader, { AttributeHeader } from '../../components/header/header';

import MyNotifications, { AttributeNotifications } from '../../components/header/notifications/notifications';

//CODE

export enum AttributeProfile {
	'photo' = 'photo',
}
class Profile extends HTMLElement {
	header: MyHeader[] = [];
	// contactInfo: MyContact[] = [];
	notifications: MyNotifications[] = [];
	contactInfo: any[] = [];
	photo?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		headerData.forEach((user) => {
			const headerHeader = this.ownerDocument.createElement('my-header') as MyHeader;
			headerHeader.setAttribute(AttributeHeader.logo, user.logo);
			headerHeader.setAttribute(AttributeHeader.photo, user.photo);
			headerHeader.setAttribute(AttributeHeader.notification, user.notification);
			this.header.push(headerHeader);
		});

		appState.notification.forEach((user: any) => {
			const headerNotification = this.ownerDocument.createElement('my-notifications') as MyNotifications;
			headerNotification.setAttribute(AttributeNotifications.name, user.name);
			headerNotification.setAttribute(AttributeNotifications.photo, user.photo);
			headerNotification.setAttribute(AttributeNotifications.texts, user.texts);
			this.notifications.push(headerNotification);
		});

		appState.user.forEach((user: any) => {
			const contactInfos = this.ownerDocument.createElement('my-contact') as MyContact;
			contactInfos.setAttribute(AttributeContact.name, user.name);
			contactInfos.setAttribute(AttributeContact.mail, user.mail);
			contactInfos.setAttribute(AttributeContact.photo, user.photo);
			contactInfos.setAttribute(AttributeContact.iconMail, user.iconMail);
			contactInfos.setAttribute(AttributeContact.iconLinkedin, user.iconLinkedin);

			this.contactInfo.push(contactInfos);
		});
	}

	async connectedCallback() {
		this.render();
	}

	render() {
		const logedUserData = appState.logedUserData;

		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			loadCss(this, styleProfile);
			this.shadowRoot.innerHTML += `
			<style>
			${styleProfile}
			</style>

      <section  >
      <img id='back-img'src="/src/asset/back.png">
      <img id='user-img' src="/src/asset/user.png">
			<h2>${appState.logedUserData.name}</h2>
			</section>
			<div class="container">
      <my-contact></my-contact>
			<button>Log Out</button></div>
      `;
		}
		const css = this.ownerDocument.createElement('style');
		css.innerHTML = stylesProfile;
		this.shadowRoot?.appendChild(css);

		const mainPageContainer = this.ownerDocument.createElement('div');
		mainPageContainer.className = 'container-';

		mainPageContainer.setAttribute('id', 'mainPageContainer');

		const BackImg = this.shadowRoot?.querySelector('#back-img');

		BackImg?.addEventListener('click', () => {
			dispatch(redirect('home'), true);
		});

		const notificationsContainer = this.ownerDocument.createElement('section');
		notificationsContainer.className = 'hidden-notifications';
		notificationsContainer.id = 'notifications-container';

		this.header.forEach((home) => {
			mainPageContainer.appendChild(home);
		});
		this.notifications.forEach((home) => {
			home.className = 'ntf-cont';
			notificationsContainer.appendChild(home);
		});

		mainPageContainer.appendChild(notificationsContainer);

		const cssContact = this.ownerDocument.createElement('style');
		cssContact.innerHTML = styleProfile;

	}
}
export default Profile;
customElements.define('app-profile', Profile);
