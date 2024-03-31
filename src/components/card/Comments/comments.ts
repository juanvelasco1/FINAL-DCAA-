import { loadCss } from '../../utils/styles';
import stylesComment from './comments.css';

import photo1 from '../../../data/Images/Andres-Salazar.png';
export enum Attributes {
	'photo' = 'photo',
	'name' = 'name',
	'texts' = 'texts',
}

class Comment extends HTMLElement {
	photo?: string;
	name?: string;
	texts?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attributes, null> = {
			photo: null,
			name: null,
			texts: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attributes, oldValue: string | undefined, newValue: string | undefined) {
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
      <img src="${this.photo}">
      <h5>${this.name}</h5>
      <p>${this.texts}</p>
      </section>
      `;
		}
		const cssComment = this.ownerDocument.createElement('style');
		cssComment.innerHTML = stylesComment;
		this.shadowRoot?.appendChild(cssComment);

		const imgPhoto = document.createElement('img');
		imgPhoto.innerHTML = photo1;
		this.shadowRoot?.appendChild(imgPhoto);
	}
}

export default Comment;
customElements.define('my-comments', Comment);
