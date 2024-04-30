import { loadCss } from '../../utils/styles';
import stylesComment from './contactInfo.css';

export enum AttributeContact {
	'name' = 'name',
	'mail' = 'mail',
}

class ContactInfo extends HTMLElement {
	name?: string;
	mail?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeContact, null> = {
			name: null,
			mail: null,
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
			loadCss(this, stylesComment);
			this.shadowRoot.innerHTML = `
			<style>
			${stylesComment}
			</style>

      <section>
      <h3>Contact Information</h3>
      <p>${this.mail}</p>
      <p>${this.name}</p>
      </section>
      `;
		}
		const cssComment = this.ownerDocument.createElement('style');
		cssComment.innerHTML = stylesComment;
		this.shadowRoot?.appendChild(cssComment);

		/*const imgPhoto = document.createElement('img');
		imgPhoto.innerHTML = photo1;
		this.shadowRoot?.appendChild(imgPhoto);*/
	}
}

export default ContactInfo;
customElements.define('my-contact', ContactInfo);