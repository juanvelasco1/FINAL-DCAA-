// Import Components
import MyCard, { Attribute } from './card';

import postStyles from './post.css';
import { appState } from '../../store';
import {getPosts, getSavedPosts} from "../../utils/firebase";

// CODE
class SavedPost extends HTMLElement {
	cardsWithComments: { card: MyCard }[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.loadSavedPosts()

	}

	connectedCallback() {
		this.render();
	}

	async loadSavedPosts() {
		const savedposts = await this.getSavedPostsAct();
		const posts = await this.getPostsAct();
		if (savedposts) {
			savedposts.forEach((postId: any) => {
				console.log("Saved postId: ", postId);

				const post = posts.find((post: any) => post.id === postId.id);
				console.log("Found post: ", post);

				if (post) {
					const card = this.ownerDocument.createElement('my-card') as MyCard;
					card.setAttribute(Attribute.name, post.user.name);
					card.setAttribute(Attribute.photo, post.user.imgProfile);
					card.setAttribute(Attribute.image, post.image);
					card.setAttribute(Attribute.tag, post.tag);
					card.setAttribute(Attribute.description, post.description);
					card.setAttribute(Attribute.ide, post.id);

					this.cardsWithComments.push({ card });
				} else {
					console.error("Post not found for postId: ", postId);
				}
			});

			this.render();
		} else {
			console.error("No saved posts found in appState.user.saved");
		}
	}

	async getSavedPostsAct() {
		const p = await getSavedPosts();
		return p;
	}

	async getPostsAct(){
		const p = await getPosts();
		return p;
	}


	render() {
		console.log("Rendering SavedPost component");
		if (this.shadowRoot) {
			const cssBanner = this.ownerDocument.createElement('style');
			cssBanner.innerHTML = postStyles;
			this.shadowRoot.appendChild(cssBanner);

			const sectionPost = this.ownerDocument.createElement('section');
			sectionPost.className = 'section-nav';

			this.cardsWithComments.forEach(({ card }) => {
				card.className = 'my-card';
				sectionPost.appendChild(card);
			});

			this.shadowRoot.appendChild(sectionPost);
		}
	}
}

export default SavedPost;
customElements.define('my-savedposts', SavedPost);
