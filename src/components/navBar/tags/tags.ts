import { loadCss } from '../../../utils/styles';
import stylesTag from './tags.css';

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
			loadCss(this, stylesTag);
			this.shadowRoot.innerHTML = `
			<style>
			${stylesTag}
			</style>
      <section class='section-tags'>
      <button id="tagButton" class="tagB" type="button">
			 ${this.tag}
			 </button>

      </section>
      `;
		}

		const cssTag = this.ownerDocument.createElement('style');
		cssTag.innerHTML = stylesTag;
		this.shadowRoot?.appendChild(cssTag);

		/*const changeColor = this.shadowRoot?.getElementById('tagButton');

		changeColor?.addEventListener('click', function () {
			if (changeColor.style.backgroundColor === '#bdbdbd') {
				changeColor.style.backgroundColor = '#8fff3c';
			} else if (changeColor.style.backgroundColor === '#8fff3c') {
				changeColor.style.backgroundColor = '#bdbdbd';
			}
		});*/

		const changeColor = this.shadowRoot?.getElementById('tagButton');
		let isGray = true; // Estado inicial del botón (gris)

		changeColor?.addEventListener('click', function () {
			if (isGray) {
				changeColor.style.backgroundColor = '#8fff3c'; // Cambiar a verde
			} else {
				changeColor.style.backgroundColor = '#bdbdbd'; // Cambiar a gris
			}
			isGray = !isGray; // Cambiar el estado del botón
		});
	}
}

customElements.define('my-tags', Tags);
export default Tags;
