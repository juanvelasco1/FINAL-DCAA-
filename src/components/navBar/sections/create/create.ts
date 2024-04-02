import { loadCss } from '../../../../utils/styles';
import stylesCreate from './create.css';

export enum AttributeCreate {
	'exit' = 'exit',
	'photo' = 'photo',
	'texts' = 'texts',
	'image' = 'image',
	'tag' = 'tag',
	'list' = 'list',
	'emoji' = 'emoji',
}

class Create extends HTMLElement {
	photo?: string;
	image?: string;
	texts?: string;
	tag?: string;
	list?: string;
	emoji?: string;
	exit?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeCreate, null> = {
			photo: null,
			image: null,
			texts: null,
			tag: null,
			list: null,
			emoji: null,
			exit: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeCreate, oldValue: string | undefined, newValue: string | undefined) {
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
			loadCss(this, stylesCreate);
			this.shadowRoot.innerHTML = `
			<style>
			${stylesCreate}
			</style>

      <section class='hidden-create' id="myCreate">
      <img src="${this.exit}">
      <img src="${this.photo}">
      <p>${this.texts}</p>

      <img src="${this.image}">
      <img src="${this.tag}">
      <img src="${this.list}">
      <img src="${this.emoji}">

      </section>
      `;
		}
		const cssCreate = this.ownerDocument.createElement('style');
		cssCreate.innerHTML = stylesCreate;
		this.shadowRoot?.appendChild(cssCreate);

		/*const imgPhoto = document.createElement('img');
		imgPhoto.innerHTML = photo1;
		this.shadowRoot?.appendChild(imgPhoto);*/
	}
}

export default Create;
customElements.define('my-create', Create);