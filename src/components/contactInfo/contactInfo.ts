import { loadCss } from '../../utils/styles';
import stylesContact from './contactInfo.css';

export enum AttributeContact {
	'name' = 'name',
	'mail' = 'mail',
	'photo' = 'photo',
	'iconLinkedin' = 'iconLinkedin',
	'iconMail' = 'iconMail',
}

class ContactInfo extends HTMLElement {
	name?: string;
	mail?: string;
	iconLinkedin?: string;
	iconMail?: string;
	photo?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeContact, null> = {
			name: null,
			mail: null,
			iconLinkedin: null,
			iconMail: null,
			photo: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeContact, oldValue: string | undefined, newValue: string | undefined) {
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
			loadCss(this, stylesContact);
			this.shadowRoot.innerHTML = `
			<style>
			${stylesContact}
			</style>

      <section>
      <h3>Contact Information</h3>
      <img src=${this.iconMail}>
      <p>${this.mail}</p>
      <img src=${this.iconLinkedin}>
      <p>${this.name}</p>
      </section>
      `;
		}
		const cssContact = this.ownerDocument.createElement('style');
		cssContact.innerHTML = stylesContact;
		this.shadowRoot?.appendChild(cssContact);

		/*const imgPhoto = document.createElement('img');
		imgPhoto.innerHTML = photo1;
		this.shadowRoot?.appendChild(imgPhoto);*/
	}
}

export default ContactInfo;
customElements.define('my-contact', ContactInfo);
