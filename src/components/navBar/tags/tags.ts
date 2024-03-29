export enum tag {
	'tag' = 'tag',
}

class Tags extends HTMLElement {
	tag?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedsection() {
		const attrs: Record<tag, null> = {
			tag: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: tag, oldValue: string | undefined, newValue: string | undefined) {
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
      <p> <strong>${this.tag}></strong></p>

      </section>
      `;
		}
	}
}

export default Tags;
customElements.define('my-Tags', Tags);
