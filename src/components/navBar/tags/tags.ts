export enum AttributeTag {
	'tag' = 'tag',
}

class Tags extends HTMLElement {
	tag?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeTag, null> = {
			tag: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeTag, oldValue: string | undefined, newValue: string | undefined) {
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
      <p> <strong>${this.tag}</strong></p>

      </section>
      `;
		}
	}
}

customElements.define('my-tags', Tags);
export default Tags;
