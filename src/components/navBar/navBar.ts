//import Datas
import { sectionData } from '../../data/sectionData';

import { tagsData } from '../../data/tagsData';

//import Components
import Section, { AttributeSection } from './sections/sections';

import Tags, { AttributeTag } from './tags/tags';
import navBarStyles from './navBar.css';

//import css
import { loadCss } from '../../utils/styles';
import stylesNavbar from './navBar.css';
import style from './navBar.css';

//CODE
class NavBar extends HTMLElement {
	navSection: Section[] = [];
	navTags: Tags[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		sectionData.forEach((user) => {
			const section = this.ownerDocument.createElement('my-section') as Section;
			section.setAttribute(AttributeSection.img, user.image);
			section.setAttribute(AttributeSection.type, user.type);
			this.navSection.push(section);
		});

		tagsData.forEach((user) => {
			const tagtag = this.ownerDocument.createElement('my-tags') as Tags;
			tagtag.setAttribute(AttributeTag.tag, user.tag);
			this.navTags.push(tagtag);
		});
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			loadCss(this, style);

			const cssBanner = this.ownerDocument.createElement('style');
			cssBanner.innerHTML = navBarStyles;
			this.shadowRoot?.appendChild(cssBanner);

			const sectionNav = this.ownerDocument.createElement('section');
			sectionNav.className = 'navSection';

			this.navSection.forEach((section) => {
				sectionNav.appendChild(section);
			});

			const tagsTitle = this.ownerDocument.createElement('h2');
			tagsTitle.innerText = 'TAGS ';
			tagsTitle.className = 'hid';
			sectionNav.appendChild(tagsTitle);
			tagsTitle.className ='titleTags';
			this.navTags.forEach((section) => {
				section.className = 'hid';
				sectionNav.appendChild(section);
			});

			this.shadowRoot.appendChild(sectionNav);
		}
	}
}

export default NavBar;
customElements.define('nav-bar', NavBar);
