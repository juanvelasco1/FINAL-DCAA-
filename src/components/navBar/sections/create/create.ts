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

<<<<<<< HEAD
			<section class='hidden-create' id="myCreate">
			<div class="create">
      <img id="close-button" class='close' src="${this.exit}">
=======
<<<<<<< HEAD
      <section class='hidden-create' id="myCreate">
      <img id="close-button" src="${this.exit}">
=======
			<section class='hidden-create' id="myCreate">
			<div class="create">
      <img id="close-button" class='close' src="${this.exit}">
>>>>>>> juan2
>>>>>>> main
      <img class='photo' src="${this.photo}">
      <p class='texts' >${this.texts}</p>

      <img class='image' src="${this.image}">
<<<<<<< HEAD
      <img class='tag' src="${this.tag}">
      <img class='list' src="${this.list}">
      <img class='emoji' src="${this.emoji}">
=======
<<<<<<< HEAD
      <img class='image' src="${this.tag}">
      <img class='image' src="${this.list}">
      <img class='image' src="${this.emoji}">
=======
      <img class='tag' src="${this.tag}">
      <img class='list' src="${this.list}">
      <img class='emoji' src="${this.emoji}">
>>>>>>> juan2
>>>>>>> main

			</div>
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
