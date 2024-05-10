import { dispatch } from '../../store/index';
import { redirect, storageUserData } from '../../store/actions';
import { Screens } from '../../types/navigation';
import input from '../../components/login/input';
import { loadCss } from '../../utils/styles';
import style from './login.css';
import { addObserver, appState } from '../../store/index';
// import './components/indexPadre';

const credentials = { email: '', password: '' };

class Login extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	handleLoginButton() {
		const resp = localStorage.getItem('credentials');
		const res = resp ? JSON.parse(resp) : [];
		if (this.validateUser(res, credentials.email, credentials.password)) {
			alert('Login successfull');
			dispatch(redirect('home'), true);
		} else {
			alert('Email y/o contraseña incorrectos');
		}
	}

	validateUser = (res: string | any[], email: any, password: any) => {
		for (var i = 0; i < res.length; i++) {
			if (res[i].email === email && res[i].password === password) {
				console.log('Dispatch user data');
				dispatch(storageUserData(res[i]), false);
				return true; // Usuario válido
			}
		}
		return false; // Usuario inválido
	};

	render() {
		if (this.shadowRoot) {
			loadCss(this, style);
		}
		const mainContainer = this.ownerDocument.createElement('main');
		const overlayContainer = this.ownerDocument.createElement('div');
		overlayContainer.className = 'overlay';

		const container = this.ownerDocument.createElement('div');
		container.id = 'login-container';
		const title = this.ownerDocument.createElement('h1');
		title.innerText = 'Log in';
		container.appendChild(title);

		const inputContainer = this.ownerDocument.createElement('input-container');
		inputContainer.id = 'login-input_container';

		const email = this.ownerDocument.createElement('input');
		email.className = 'input';
		email.placeholder = 'Institutional Mail';
		email.type = 'email';
		email.addEventListener('change', (e: any) => (credentials.email = e.target.value));
		inputContainer.appendChild(email);

		const password = this.ownerDocument.createElement('input');
		password.className = 'input';
		password.placeholder = 'Password';
		password.type = 'password';
		password.addEventListener('change', (e: any) => (credentials.password = e.target.value));
		inputContainer.appendChild(password);

		container.appendChild(inputContainer);

		const loginBtn = this.ownerDocument.createElement('button');
		loginBtn.className = 'login-btn';
		loginBtn.innerText = 'Go!';
		loginBtn.addEventListener('click', () => this.handleLoginButton());
		container.appendChild(loginBtn);

		const signupContainer = this.ownerDocument.createElement('div');
		signupContainer.className = 'signup-container';

		const signupText = this.ownerDocument.createElement('h3');
		signupText.innerHTML =
			"You do not have an account? <button id='signup-button' class='signup-link'>sign up here</button>";
		signupContainer.appendChild(signupText);
		container.appendChild(signupContainer);

		const aSignupBtn = signupText.querySelector('#signup-button');
		aSignupBtn?.addEventListener('click', () => {
			dispatch(redirect('signup'), true);
		});

		mainContainer.appendChild(overlayContainer);
		mainContainer.appendChild(container);

		this.shadowRoot?.appendChild(mainContainer);
	}
}
export default Login;
customElements.define('app-login', Login);
