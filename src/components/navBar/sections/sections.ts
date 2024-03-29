export enum sections {
	'image' = 'image',
}

class Section extends HTMLElement {
	image?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedsection() {
		const attrs: Record<sections, null> = {
			image: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: sections, oldValue: string | undefined, newValue: string | undefined) {
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

export default Section;
customElements.define('my-Section', Section);
