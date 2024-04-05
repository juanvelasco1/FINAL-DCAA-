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
			loadCss(this, stylesCard);
			this.shadowRoot.innerHTML = `

			<style>
			${stylesCard}
			</style>

			<link rel="stylesheet" href="../src/Components/card/card.css">

			<section class='card'>
			<img class='photo' src=${this.photo} >
			<h3>${this.name}</h3>

			<img src=${this.image} class='image' >

			<button class="heart" type="button">
			<img class="like" id="likeButton" src="/src/asset/like.png">
			</button>

			<img class="coment" src="/src/asset/comment.png">
			<div class=tag >
			<p> <strong>${this.tag}</strong></p>
			</div>

			<button class="bookmark" type="button">
			<img  class="save" id='saveButton' src="/src/asset/save.png">
			</button>

			<p class='desc' >${this.description}</p >
			</section>
      `;
		}
		const cssCard = this.ownerDocument.createElement('style');
		cssCard.innerHTML = stylesCard;
		this.shadowRoot?.appendChild(cssCard);

		const changeButton = this.shadowRoot?.getElementById('likeButton');

		changeButton?.addEventListener('click', function () {
			if (changeButton.getAttribute('src') === '/src/asset/like.png') {
				changeButton.setAttribute('src', '/src/asset/like-full.png');
			} else {
				changeButton.setAttribute('src', '/src/asset/like.png');
			}
		});

		const changeButtonSave = this.shadowRoot?.getElementById('saveButton');

		changeButtonSave?.addEventListener('click', function () {
			if (changeButtonSave.getAttribute('src') === '/src/asset/save.png') {
				changeButtonSave.setAttribute('src', '/src/asset/save-full.png');
			} else {
				changeButtonSave.setAttribute('src', '/src/asset/save.png');
			}
		});

		// const like = document.getElementById('like');
		// const image1 = document.getElementById('image1');
		// const image2 = document.getElementById('image2');
		// const likeF = document.getElementById('likeF');

		// if (like && image1 && image2 && likeF) {
		// 	like.style.display = image1.style.display === 'none' ? 'block' : 'none';
		// 	likeF.style.display = image2.style.display === 'none' ? 'block' : 'none';
		// }
	}

	/*	const photo = document.createElement('img');
	photo.innerHTML = img;
	this.shadowRoot?.appendChild(photo);

	const imag = document.createElement('img');
	imag.innerHTML = image;
	this.shadowRoot?.appendChild(imag);*/
}

export default Card;
customElements.define('my-card', Card);
