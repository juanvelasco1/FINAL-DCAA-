export enum section {
	'image' = 'image',
}

class Comment extends HTMLElement {
	image?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedsection() {
		const attrs: Record<section, null> = {
			image: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: section, oldValue: string | undefined, newValue: string | undefined) {
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
      <img src="${this.image}">

      </section>
      `;
		}
	}
}

export default Comment;
customElements.define('my-comments', Comment);
