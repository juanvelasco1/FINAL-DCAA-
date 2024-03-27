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
			this.shadowRoot.innerHTML = `
      <section>
      <img src="${this.photo}">
      <h3>${this.name}</h3>

      <img src="${this.image}">
      <p> <strong>${this.tag}></strong></p>
       <p>${this.description}</p>
      </section>
      `;
		}
	}
}

export default Card;
customElements.define('my-card', Card);
