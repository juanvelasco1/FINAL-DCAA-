//padre
import './components/indexPadre';

//import Datas
import { postData } from './data/postData';

import { commentsData } from './data/commentsData';

import { userData } from './data/userData';

import { sectionData } from './data/sectionData';

import { tagsData } from './data/tagsData';

//import Components
import MyCard, { Attribute } from './components/card/card';
import Card from './components/card/card';

import MyComments, { Attributes } from './components/card/Comments/comments';
import Commen from './components/card/Comments/comments';

import MySections, { sections } from './components/navBar/sections/sections';
import Section from './components/navBar/sections/sections';

import MyTags, { tag } from './components/navBar/tags/tags';
import Tags from './components/navBar/tags/tags';

//CODE
class AppContainer extends HTMLElement {
	homes: MyCard[] = [];
	home: MyComments[] = [];
	navSection: MySections[] = [];
	navTags: MyTags[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		userData.forEach((user) => {
			const homeCard = this.ownerDocument.createElement('my-card') as MyCard;
			homeCard.setAttribute(Attribute.photo, user.photo);
			homeCard.setAttribute(Attribute.name, user.name);

			this.homes.push(homeCard);
		});

		postData.forEach((user) => {
			const homeCard = this.ownerDocument.createElement('my-card') as MyCard;
			homeCard.setAttribute(Attribute.image, user.image);
			homeCard.setAttribute(Attribute.description, user.description);

			this.homes.push(homeCard);
		});

		commentsData.forEach((user) => {
			const homeComment = this.ownerDocument.createElement('my-comments') as MyComments;
			homeComment.setAttribute(Attributes.photo, user.comment.photo);
			homeComment.setAttribute(Attributes.name, user.comment.name);
			homeComment.setAttribute(Attributes.texts, user.comment.texts);

			this.home.push(homeComment);
		});

		sectionData.forEach((user) => {
			const section = this.ownerDocument.createElement('my-Section') as MySections;
			section.setAttribute(sections.image, user.image);

			this.navSection.push(section);
		});

		tagsData.forEach((user) => {
			const tagtag = this.ownerDocument.createElement('my-Tags') as MyTags;
			tagtag.setAttribute(tag.tag, user.tag);

			this.navTags.push(tagtag);
		});
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.homes.forEach((home) => {
				this.shadowRoot?.appendChild(home);
			});
		}
	}
}

customElements.define('app-container', AppContainer);
