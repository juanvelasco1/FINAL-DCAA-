import { postData } from './data/postData';

import { commentsData } from './data/commentsData';

import { userData } from './data/userData';

import './components/indexPadre';

import MyCard, { Attribute } from './components/card/card';
import Card from './components/card/card';

import MyComments, { Attributes } from './components/card/Comments/comments';
import Comment from './components/card/Comments/comments';
import styles from './indexAbuelo.css';

class AppContainer extends HTMLElement {
	homes: MyCard[] = [];
	home: MyComments[] = [];

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
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
				<style>
				${styles}
				</style>
				`;
			const container = this.ownerDocument.createElement('section');
			container.className = 'container';
			this.homes.forEach((myCard) => {
				container.appendChild(myCard);
			});
			this.shadowRoot?.appendChild(container);
		}
	}
}

customElements.define('app-container', AppContainer);
