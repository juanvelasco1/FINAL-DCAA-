import { loadCss } from '../../utils/styles';
import stylesCard from '../card/card.css';

export enum Attribute {
	'photo' = 'photo',
	'name' = 'name',
	'image' = 'image',
	'tag' = 'tag',
	'description' = 'description',
}

class Card extends HTMLElement {
	photo?: string;
	name?: string;
	image?: string;
	description?: string;
	tag?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			photo: null,
			name: null,
			image: null,
			description: null,
			tag: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
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
			this.shadowRoot.innerHTML = '';
			loadCss(this, stylesCard);
			this.shadowRoot.innerHTML += `

			<link rel="stylesheet" href="../src/Components/card/card.css">

			<section class='card'>
			<img src=${this.photo}class='photo'>
			<h3>${this.name}</h3>
      <div>
			<img src="${this.image}" class='image'>
			</div>
			<img src="../../asset/like.png">
			<img src="../../asset/comment.png">
			<p> <strong>${this.tag}</strong></p>
			<img src="../../asset/save.png">
			<p>${this.description}</p>
			</section>
      `;
		}
		const cssCard = this.ownerDocument.createElement('style');
		cssCard.innerHTML = stylesCard;
		this.shadowRoot?.appendChild(cssCard);

		/*	const photo = document.createElement('img');
		photo.innerHTML = img;
		this.shadowRoot?.appendChild(photo);

		const imag = document.createElement('img');
		imag.innerHTML = image;
		this.shadowRoot?.appendChild(imag);*/
	}
}

export default Card;
customElements.define('my-card', Card);
