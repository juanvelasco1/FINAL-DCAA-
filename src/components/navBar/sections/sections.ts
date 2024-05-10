import { dispatch } from '../../../store';
import { redirect } from '../../../store/actions';
import { loadCss } from '../../../utils/styles';
import stylesSections from './sections.css';

export enum AttributeSection {
	'img' = 'img',
	'type' = 'type',
}

class Section extends HTMLElement {
	img?: string;
	type?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeSection, null> = {
			img: null,
			type: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeSection, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case AttributeSection.img:
				this.img = newValue;
				break;
			case AttributeSection.type:
				this.type = newValue;
				break;
			default:
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

			<style>
			${stylesSections}
			</style>


			<link rel="stylesheet" href="../src/Components/card/card.css">

      <section class='section-sections'>
      <img  id=${this.type + '-img'} src=${this.img}>

      			</section>
      		`;
		}
		const cssSections = this.ownerDocument.createElement('style');
		cssSections.innerHTML = stylesSections;
		this.shadowRoot?.appendChild(cssSections);

		const createImg = this.shadowRoot?.querySelector('#create-img');

		const SavedImg = this.shadowRoot?.querySelector('#saved-img');

		SavedImg?.addEventListener('click', () => {
			dispatch(redirect('saved'), true);
		});

		const HomeImg = this.shadowRoot?.querySelector('#home-img');

		HomeImg?.addEventListener('click', () => {
			dispatch(redirect('home'), true);
		});

		const myCreatedSection = this.ownerDocument
			.querySelector('app-container')
			?.shadowRoot?.querySelector('app-home')
			?.shadowRoot?.querySelector('my-create')
			?.shadowRoot?.getElementById('myCreate');

		const closeButton = this.ownerDocument
			.querySelector('app-container')
			?.shadowRoot?.querySelector('app-home')
			?.shadowRoot?.querySelector('my-create')
			?.shadowRoot?.getElementById('close-button');

		createImg?.addEventListener('click', () => {
			if (myCreatedSection?.className === 'hidden-create') {
				myCreatedSection.classList.add('section-create');
				myCreatedSection.classList.remove('hidden-create');
			} else if (myCreatedSection?.className === 'section-create') {
				myCreatedSection.classList.remove('section-create');
				myCreatedSection.classList.add('hidden-create');
			}
		});

		if (this.type === 'create') {
			closeButton?.addEventListener('click', () => {
				if (myCreatedSection) {
					myCreatedSection.classList.remove('section-create');
					myCreatedSection.classList.add('hidden-create');
				}
			});

			/*const imgHome = document.createElement('img');
		imgHome.innerHTML = home;
		this.shadowRoot?.appendChild(imgHome);

		const imgSaved = document.createElement('img');
		imgSaved.innerHTML = saved;
		this.shadowRoot?.appendChild(imgSaved);

		const imgCreate = document.createElement('img');
		imgCreate.innerHTML = create;
		this.shadowRoot?.appendChild(imgCreate);*/
		}
	}
}

customElements.define('my-section', Section);
export default Section;
