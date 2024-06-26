import { dispatch } from '../../store/index';
import { redirect } from '../../store/actions';
import { Screens } from '../../types/navigation';
import { loadCss } from '../../utils/styles';
import style from './signup.css';
import input from '../../components/login/input';
import { addObserver, appState } from '../../store/index';
import { createUser } from '../../utils/firebase'
// import './components/indexPadre';

const credentials = { email: '', password: '', confirmPassword: '', name: '' };

class Signup extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	handleLoginButton() {
		const bbdd = localStorage.getItem('credentials');

		if (credentials.password === credentials.confirmPassword) {
			if (!bbdd) {
				localStorage.setItem('credentials', JSON.stringify([credentials]));
			} else {
				const newCredentials = [...JSON.parse(bbdd), credentials];
				localStorage.setItem('credentials', JSON.stringify(newCredentials));
			}
			createUser(credentials);
			dispatch(redirect('login'), true);
			alert('Login successfull');
		} else {
			alert('te equivocaste con la confirmación');
		}
		console.log(credentials);
	}

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
		title.innerText = 'Sign up';
		container.appendChild(title);

		const inputContainer = this.ownerDocument.createElement('form');
		inputContainer.id = 'login-input_container';

		const email = this.ownerDocument.createElement('input');
		email.className = 'input';
		email.placeholder = 'Institucional Mail';
		email.type = 'email';
		email.addEventListener('change', (e: any) => (credentials.email = e.target.value));
		inputContainer.appendChild(email);

		const name = this.ownerDocument.createElement('input');
		name.className = 'input';
		name.placeholder = 'Name';
		name.type = 'text';
		name.addEventListener('change', (e: any) => (credentials.name = e.target.value));
		inputContainer.appendChild(name);

		const password = this.ownerDocument.createElement('input');
		password.className = 'input';
		password.placeholder = 'Password';
		password.type = 'password';
		password.addEventListener('change', (e: any) => (credentials.password = e.target.value));
		inputContainer.appendChild(password);

		const confirmPassword = this.ownerDocument.createElement('input');
		confirmPassword.className = 'input';
		confirmPassword.placeholder = 'Confirm Password';
		confirmPassword.type = 'password';
		confirmPassword.addEventListener('change', (e: any) => (credentials.confirmPassword = e.target.value));
		inputContainer.appendChild(confirmPassword);

		container.appendChild(inputContainer);

		const loginBtn = this.ownerDocument.createElement('button');
		loginBtn.className = 'login-btn';
		loginBtn.innerText = 'Go!';
		loginBtn.addEventListener('click', this.handleLoginButton);
		container.appendChild(loginBtn);

		const signupContainer = this.ownerDocument.createElement('div');
		signupContainer.className = 'signup-container';

		const signupText = this.ownerDocument.createElement('h3');
		signupText.innerHTML =
			"Do you have an account? <button id='signup-button' class='signup-link'>sign up here</button>";
		signupContainer.appendChild(signupText);
		container.appendChild(signupContainer);

		const aSignupBtn = signupText.querySelector('#signup-button');
		aSignupBtn?.addEventListener('click', () => dispatch(redirect('login'), true));

		mainContainer.appendChild(overlayContainer);
		mainContainer.appendChild(container);

		this.shadowRoot?.appendChild(mainContainer);
	}
}

export default Signup;
customElements.define('app-signup', Signup);
