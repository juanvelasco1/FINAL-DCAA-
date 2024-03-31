import { loadCss } from '../../../utils/styles';
import stylesSections from './sections.css';
import home from '../../../data/Images/Home_active.png';
import saved from '../../../data/Images/Saved_disabled.png';
import create from '../../../data/Images/Create_disabled.png';

export enum AttributeSection {
	'img' = 'img',
}

class Section extends HTMLElement {
	img?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeSection, null> = {
			img: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeSection, oldValue: string | undefined, newValue: string | undefined) {
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

	/*  <style>
			${stylesSections}
			</style>*/

	render() {
		if (this.shadowRoot) {
			loadCss(this, stylesSections);
			this.shadowRoot.innerHTML = `


			<link rel="stylesheet" href="../src/Components/card/card.css">

      <section>
      <img src=${this.img}>

      </section>
      `;
		}
		const cssSections = this.ownerDocument.createElement('style');
		cssSections.innerHTML = stylesSections;
		this.shadowRoot?.appendChild(cssSections);

		const imgHome = document.createElement('img');
		imgHome.innerHTML = home;
		this.shadowRoot?.appendChild(imgHome);

		const imgSaved = document.createElement('img');
		imgSaved.innerHTML = saved;
		this.shadowRoot?.appendChild(imgSaved);

		const imgCreate = document.createElement('img');
		imgCreate.innerHTML = create;
		this.shadowRoot?.appendChild(imgCreate);
	}
}

customElements.define('my-section', Section);
export default Section;
