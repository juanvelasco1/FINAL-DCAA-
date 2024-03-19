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

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
   if (newValue !== oldValue) {
      this[propName] = newValue;
		}}
		//this.render();
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
      <p>${this.texts}</p>
      </section>
      `;
		}
	}
}

export default Comment;
customElements.define('my-comments', Comment);
