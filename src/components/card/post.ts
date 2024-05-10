//import Datas

// import { postData } from '../../data/postData';

import { commentsData } from '../../data/commentsData';

//import Components
import MyCard, { Attribute } from '../card/card';

import MyComments, { Attributes } from './Comments/comments';

import postStyles from './post.css';
import { appState } from '../../store';

//CODE
class Post extends HTMLElement {
	//homes: MyCard[] = [];
	//home: MyComments[] = [];
	cardsWithComments: { card: MyCard; comment: MyComments }[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		appState.posts.forEach((post: any) => {
			const card = this.ownerDocument.createElement('my-card') as MyCard;
			card.setAttribute(Attribute.name, post.user.name);
			card.setAttribute(Attribute.photo, post.user.imgProfile);
			card.setAttribute(Attribute.image, post.image);
			card.setAttribute(Attribute.tag, post.tag);
			card.setAttribute(Attribute.description, post.description);

			const comment = this.ownerDocument.createElement('my-comments') as MyComments;
			comment.setAttribute(Attributes.photo, post.comment.photo);
			comment.setAttribute(Attributes.name, post.comment.name);
			comment.setAttribute(Attributes.texts, post.comment.texts);

			this.cardsWithComments.push({ card, comment });
		});
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			const cssBanner = this.ownerDocument.createElement('style');
			cssBanner.innerHTML = postStyles;
			this.shadowRoot?.appendChild(cssBanner);

			const sectionPost = this.ownerDocument.createElement('section');
			sectionPost.className = 'section-nav';

			this.cardsWithComments.forEach(({ card, comment }) => {
				card.className = 'my-card';
				sectionPost.appendChild(card);
				sectionPost.appendChild(comment);
			});

			this.shadowRoot.appendChild(sectionPost);
		}
	}
}

export default Post;
customElements.define('my-post', Post);
