import { postData } from './data/postData';

import { commentsData } from './data/commentsdata';

import { userData } from './data/userData';

import './components/indexPadre';

import MyCard, { Attribute } from './components/card/card';
import Card from './components/card/card';

import MyComments, { Attributes } from './components/comments/comments';
import Comment from './components/comments/comments';

class AppContainer extends HTMLElement {
	homes: MyCard[] = [];

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
			const homeCard = this.ownerDocument.createElement('my-card') as MyCard;
			homeCard.setAttribute(Attribute.photo, user.comment.photo);
			homeCard.setAttribute(Attribute.name, user.comment.name);
			homeCard.setAttribute(Attribute.texts, user.comment.texts);

			this.homes.push(homeCard);
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
