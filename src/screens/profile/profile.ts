//padre
import './components/indexPadre';

//import Datas

import { userData } from '../../data/userData';

//import Components

import MyContact, { AttributeContact } from '../../components/contactInfo/contactInfo';

import * as styles from './styles.css';
import { loadCss } from '../../utils/styles';

//Importar estilos
import styleProfile from './profile.css';

import { addObserver, appState } from '../../store/index';
import ContactInfo from '../../components/contactInfo/contactInfo';

//CODE

export enum AttributeProfile {
	'photo' = 'photo',
}
class Profile extends HTMLElement {
	//	homes: MyCard[] = [];
	//	home: MyComments[] = [];
	contactInfo: MyContact[] = [];
	photo?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this); // Página de renderización dinámica

		userData.forEach((user) => {
			const contactInfo = this.ownerDocument.createElement('my-contact') as MyContact;
			contactInfo.setAttribute(AttributeContact.name, user.name);
			contactInfo.setAttribute(AttributeContact.mail, user.mail);
			contactInfo.setAttribute(AttributeContact.photo, user.photo);
			contactInfo.setAttribute(AttributeContact.iconMail, user.iconMail);
			contactInfo.setAttribute(AttributeContact.iconLinkedin, user.iconLinkedin);

			this.contactInfo.push(contactInfo);
		});
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			loadCss(this, styleProfile);
			this.shadowRoot.innerHTML += `
			<style>
			${styleProfile}
			</style>

      <section  >
      <img src="/src/asset/back.png">
      <img src=${this.photo}>
			</section>
      <my-contact></my-contact>
			<button>Log Out</button>
      `;
		}
		const cssContact = this.ownerDocument.createElement('style');
		cssContact.innerHTML = styleProfile;

		const contactInfo = this.ownerDocument.createElement('my-contact') as ContactInfo;
		this.shadowRoot?.appendChild(contactInfo);
	}
}
export default Profile;
customElements.define('app-profile', Profile);
