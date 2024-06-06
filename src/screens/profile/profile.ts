/// Importar Datos
import { userData } from '../../data/userData';

// Importar Componentes
import MyContact, { AttributeContact } from '../../components/contactInfo/contactInfo';
import MyHeader, { AttributeHeader } from '../../components/header/header';
import MyNotifications, { AttributeNotifications } from '../../components/header/notifications/notifications';

// Importar Estilos
import * as styles from './styles.css';
import { loadCss } from '../../utils/styles';
import stylesProfile from './profile.css';

// Importar Otros Módulos
import { addObserver, appState } from '../../store/index';
import { dispatch } from '../../store';
import { redirect } from '../../store/actions';
import { getPostsAction } from '../../store/actions';
import { headerData } from '../../data/headerData';

export enum AttributeProfile {
	'photo' = 'photo',
}

class Profile extends HTMLElement {
	header: MyHeader[] = [];
	notifications: MyNotifications[] = [];
	contactInfo: MyContact[] = [];
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

	logout() {
		console.log('entra');
		indexedDB.deleteDatabase('firebaseLocalStorageDb');
		indexedDB.deleteDatabase('firebase-heartbeat-database');
		window.location.reload();
	}

	render() {
		const logedUserData = appState.logedUserData;

		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			loadCss(this, stylesProfile);
			this.shadowRoot.innerHTML += `
                <style>
                ${stylesProfile}
                </style>

                <section>
                    <img id='back-img' src="/src/asset/back.png">
                    <img id='user-img' src="/src/asset/user.png">
                    <h2>${logedUserData.name}</h2>
                </section>
                <div class="container">
                    <my-contact></my-contact>

                </div>
            `; // <button>Log Out</button>

			const mainPageContainer = this.ownerDocument.createElement('div');
			mainPageContainer.className = 'container-';
			mainPageContainer.id = 'mainPageContainer';

			const BackImg = this.shadowRoot.querySelector('#back-img');
			BackImg?.addEventListener('click', () => {
				dispatch(redirect('home'), true);
			});

			const logoutBtn = this.ownerDocument.createElement('button');
			logoutBtn.innerText = 'Logout';
			logoutBtn.addEventListener('click', this.logout);
			this.shadowRoot?.appendChild(logoutBtn);

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

			this.shadowRoot.appendChild(mainPageContainer);
		}
	}
}

export default Profile;
customElements.define('app-profile', Profile);
