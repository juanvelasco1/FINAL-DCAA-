
/// Importar Datos

//padre
// import './components/indexPadre';

//import Datas

import { userData } from '../../data/userData';

// Importar Componentes
import MyContact, { AttributeContact } from '../../components/contactInfo/contactInfo';

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

import MyHeader, { AttributeHeader } from '../../components/header/header';

import MyNotifications, { AttributeNotifications } from '../../components/header/notifications/notifications';
import {signOutUser, updateProfileInfo} from "../../utils/firebase";

//CODE

export enum AttributeProfile {
	'photo' = 'photo',
}

let fileExport: File | null = null

class Profile extends HTMLElement {
	//	homes: MyCard[] = [];
	//	home: MyComments[] = [];
	header: MyHeader[] = [];
	notifications: MyNotifications[] = [];
	contactInfo: MyContact[] = [];
	photo?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		// addObserver(this); // Página de renderización dinámica

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
		// 	notificationData.forEach((user:any) => {
		// 		const headerNotification = this.ownerDocument.createElement('my-notifications') as MyNotifications;
		// 		headerNotification.setAttribute(AttributeNotifications.name, user.name);
		// 		headerNotification.setAttribute(AttributeNotifications.photo, user.photo);
		// 		headerNotification.setAttribute(AttributeNotifications.texts, user.texts);
		// 		this.notifications.push(headerNotification);
		// });



		const contactInfos = this.ownerDocument.createElement('my-contact') as MyContact;
		contactInfos.setAttribute(AttributeContact.name, appState.user.name);
		contactInfos.setAttribute(AttributeContact.mail, appState.user.email);
		contactInfos.setAttribute(AttributeContact.photo, appState.user.photo);
		this.contactInfo.push(contactInfos);

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

		const onSavedButton = async (user: string, photo: File | null) =>{
			try{
				await updateProfileInfo(user, photo);
			} catch (error){
				console.error(error);
			}
		}

		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			loadCss(this, stylesProfile);
			this.shadowRoot.innerHTML += `
			<style>
			${stylesProfile}
			</style>

   	<section id="section-container" >
      			<img id='back-img'src="/src/asset/back.png" class="">
      			<input class="opacity-0" id="file-input" type="file">
      			<label for="file-input"><img id="user-photo" src='${appState.user.photo}' alt="User-photo" class=""></label>
				<input id="name-label" type="text" value="${appState.user?.name}" class="">
				<my-contact></my-contact>
				<div class="flex space-x-2">
					<button id="logout-button">Log Out</button>
					<button id="edit" >Edit profile</button>
				</div>

      		</section>
      `;
		}

		let username = appState.user?.name;
		const usernameInput = this.shadowRoot?.querySelector('#name-label') as HTMLInputElement;
		const saveButton = this.shadowRoot?.querySelector('#edit') as HTMLButtonElement;
		usernameInput.value = username

		usernameInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			username = target.value || '';
		});

		saveButton.addEventListener('click', () => {
			onSavedButton(username, fileExport).then(r => console.log('user was updated ' + r))
		})

		const userPhoto = this.shadowRoot?.querySelector('#user-photo') as HTMLImageElement;

		const logoutButton = this.shadowRoot?.querySelector('#logout-button') as HTMLButtonElement;
		logoutButton.addEventListener('click', e => {
			signOutUser();
		})
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
		cssContact.innerHTML = stylesProfile;

		// const contactInfo = this.ownerDocument.createElement('my-contact') as ContactInfo;
		// this.shadowRoot?.appendChild(contactInfo);

		const fileInput = this.shadowRoot?.querySelector('#file-input') as HTMLElement;

		fileInput?.addEventListener('change', (e) => {

			const target = e.target as HTMLInputElement;
			const files = target?.files;
			const preview = this.shadowRoot?.querySelector('#user-photo') as HTMLImageElement;

			if (files && files.length > 0) {
				console.log(files);
				const file = files[0];

				const reader = new FileReader();
				reader.onload = function(event) {
					if (event.target && preview) {
						preview.src = event.target.result as string;
						preview.style.display = 'block';
					}
				};
				reader.readAsDataURL(file);
				fileExport = file;
				console.log(fileExport)
			}
		});

	}
}

export default Profile;
customElements.define('app-profile', Profile);
