//padre
import './components/indexPadre';

//import Datas
import { postData } from './data/postData';

import { commentsData } from './data/commentsData';

import { headerData } from './data/headerData';

//import Components
import MyCard, { Attribute } from './components/card/card';

import MyComments, { Attributes } from './components/card/Comments/comments';

import MyHeader, { AttributeHeader } from './components/header/header';

import NavBar from './components/navBar/navBar';

import * as styles from './styles.css';
import { loadCss } from './utils/styles';

//Importar estilos
import style from './indexAbuelo.css'

//CODE
class AppContainer extends HTMLElement {
	homes: MyCard[] = [];
	home: MyComments[] = [];
	header: MyHeader[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		headerData.forEach((user) => {
			const headerHeader = this.ownerDocument.createElement('my-header') as MyHeader;
			headerHeader.setAttribute(AttributeHeader.logo, user.logo);
			headerHeader.setAttribute(AttributeHeader.photo, user.photo);
			headerHeader.setAttribute(AttributeHeader.notification, user.notification);
			this.header.push(headerHeader);
		});

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
		loadCss(this, style)

		const mainPageContainer = this.ownerDocument.createElement("div")
		mainPageContainer.setAttribute("id", "mainPageContainer")
		this.shadowRoot?.appendChild(mainPageContainer)

		this.header.forEach((home) => {
			mainPageContainer.appendChild(home);
		});

		this.homes.forEach((home) => {
			mainPageContainer.appendChild(home);
		});

		this.home.forEach((home) => {
			mainPageContainer.appendChild(home);
		});

		const navBar = this.ownerDocument.createElement('nav-bar') as NavBar;
		mainPageContainer.appendChild(navBar);
	}
}

customElements.define('app-container', AppContainer);
