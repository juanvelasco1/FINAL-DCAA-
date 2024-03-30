//padre
import './components/indexPadre';

//import Datas
import { postData } from './data/postData';

import { commentsData } from './data/commentsData';

//import Components
import MyCard, { Attribute } from './components/card/card';

import MyComments, { Attributes } from './components/card/Comments/comments';
import Comment from './components/card/Comments/comments';
import styles from './indexAbuelo.css';

//CODE
class AppContainer extends HTMLElement {
	homes: MyCard[] = [];
	home: MyComments[] = [];
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		postData.forEach((post) => {
			const homeCard = this.ownerDocument.createElement('my-card') as MyCard;
			homeCard.setAttribute(Attribute.name, post.user.name);
			homeCard.setAttribute(Attribute.photo, post.user.imgProfile);
			homeCard.setAttribute(Attribute.image, post.image);
			homeCard.setAttribute(Attribute.tag, post.tag);
			homeCard.setAttribute(Attribute.description, post.description);
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
