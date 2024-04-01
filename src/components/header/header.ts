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

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ""

			loadCss(this, stylesHeader);

			this.shadowRoot.innerHTML += `
				<section id='header'>
					<img src="${this.logo}" class='logo'>
					<div id='horizontalSpace'></div>
					<img src="${this.notification}" class='notification'>
					<img src="${this.photo}" class='photo'>
				</section>
			`;
		}
	}
}

export default Header;
customElements.define('my-header', Header);
