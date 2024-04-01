//padre
import './components/indexPadre';

//import Datas
import { postData } from './data/postData';

import { commentsData } from './data/commentsData';

import { headerData } from './data/headerData';

import { notificationData } from './data/notificationData';

import { createData } from './data/createData';

//import Components
import MyCard, { Attribute } from './components/card/card';

import MyComments, { Attributes } from './components/card/Comments/comments';

import MyHeader, { AttributeHeader } from './components/header/header';

import MyNotifications, { AttributeNotifications } from './components/header/notifications/notifications';

import MyCreate, { AttributeCreate } from './components/navBar/sections/create/create';

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
	notifications: MyNotifications[] = [];
	create: MyCreate[] = [];

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

		notificationData.forEach((user) => {
			const headerNotification = this.ownerDocument.createElement('my-notifications') as MyNotifications;
			headerNotification.setAttribute(AttributeNotifications.name, user.name);
			headerNotification.setAttribute(AttributeNotifications.photo, user.photo);
			headerNotification.setAttribute(AttributeNotifications.texts, user.texts);
			this.notifications.push(headerNotification);
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

		createData.forEach((user) => {
			const navCreate = this.ownerDocument.createElement('my-create') as MyCreate;
			navCreate.setAttribute(AttributeCreate.exit, user.exits.exit);
			navCreate.setAttribute(AttributeCreate.photo, user.photo);
			navCreate.setAttribute(AttributeCreate.texts, user.texts);
			navCreate.setAttribute(AttributeCreate.image, user.image);
			navCreate.setAttribute(AttributeCreate.tag, user.tag);
			navCreate.setAttribute(AttributeCreate.list, user.list);
			navCreate.setAttribute(AttributeCreate.emoji, user.emoji);

			this.create.push(navCreate);
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

		this.create.forEach((home) => {
			console.log(home);
			this.shadowRoot?.appendChild(home);
		});

		this.notifications.forEach((home) => {
			console.log(home);
			this.shadowRoot?.appendChild(home);
		});

		const navBar = this.ownerDocument.createElement('nav-bar') as NavBar;
		this.shadowRoot?.appendChild(navBar);
	}
}

customElements.define('app-container', AppContainer);
