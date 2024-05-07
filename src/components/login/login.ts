//Importar estilos
import style from './indexAbuelo.css';

import { addObserver, appState, dispatch } from '../../store/index';
import { loadCss } from '../../utils/styles';
import stylesCard from '../card/card.css';
import { redirect } from '../../store/actions';

//CODE
class Login extends HTMLElement {
	//	homes: MyCard[] = [];
	//	home: MyComments[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this); // Página de renderización dinámica
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			loadCss(this, stylesCard);
			this.shadowRoot.innerHTML = `

			<section class=''>
			<button class="bookmark" type="button" id="login-button">
			    Login
			</button>
			</section>
      `;
		}

		const loginButton = this.shadowRoot?.getElementById('login-button');

		loginButton?.addEventListener('click', function () {
			console.log(appState);
			dispatch(redirect('home'));
		});
	}
}
export default Login;
customElements.define('login-page', Login);
