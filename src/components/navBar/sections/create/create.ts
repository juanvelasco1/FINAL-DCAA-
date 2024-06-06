import { loadCss } from '../../../../utils/styles';
import stylesCreate from './create.css';
import {addObserver, appState, dispatch} from "../../../../store";
import {uploadPost, getAppState, auth} from "../../../../utils/firebase"
import {redirect} from "../../../../store/actions";
import {personalUser} from "../../../../types/users";
import post from "../../../card/post";

export enum AttributeCreate {
	'exit' = 'exit',
	'photo' = 'photo',
	'texts' = 'texts',
	'image' = 'image',
	'tag' = 'tag',
	'list' = 'list',
	'emoji' = 'emoji',
}

const postInfo: {user: string, postBody: string, image: File | null, imgProfile: string} = { user: appState.user.name, postBody: '', image: null, imgProfile: appState.user.photo}

class Create extends HTMLElement {
	photo?: string;
	image?: string;
	texts?: string;
	tag?: string;
	list?: string;
	emoji?: string;
	exit?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	static get observedAttributes() {
		const attrs: Record<AttributeCreate, null> = {
			photo: null,
			image: null,
			texts: null,
			tag: null,
			list: null,
			emoji: null,
			exit: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeCreate, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	async onSubmitButton(e: Event){
		e.preventDefault();
		console.log(postInfo)
		postInfo.imgProfile = auth.currentUser?.photoURL || '';
		postInfo.user = auth.currentUser?.displayName || '';
		await uploadPost(postInfo);
		dispatch(redirect('home'), true)
	}



	render() {
		if (this.shadowRoot) {
			loadCss(this, stylesCreate);
			this.shadowRoot.innerHTML = `
			<style>
			${stylesCreate}
			</style>
		
			<section class='hidden-create' id="myCreate">
				<form class="create">
					<img id="close-button" class='close' src="${this.exit}">
					<section class="body">
						<img class='photo' src="${this.photo}">
      					<textarea id="text-area" placeholder="what is happening?" class="content-text" name="content-text" class='texts' required></textarea>
					</section>
      				
      				<section class='tags'>
						<div class="file-input-wrapper">
							<input type="file" id="fileInput" name = "img" class="file-input" required>
							<label for="fileInput" class="upload-label">
								<img class='upload-icon' src="${this.image}">
							</label>
						</div>
						
      					<img class='tag' src="${this.tag}">
      					<img class='list' src="${this.list}">
      					<img class='emoji' src="${this.emoji}">
      					<div class="flex my-auto space-x-2 justify-center content-center">
      						<span id="fileName" class="file-name text-sm">No file chosen</span>
      						<img id="preview" src="" alt="Image Preview" class="image-preview" style="display: none;">
						</div>
      				
      					<input type="submit" value="Post">
					</section>
				</form>
      		</section>
      `;
		}

		const fileInput = this.shadowRoot?.querySelector('#fileInput') as HTMLElement;

		fileInput?.addEventListener('change', (e) => {

			const target = e.target as HTMLInputElement;
			const files = target?.files;
			const fileName = this.shadowRoot?.querySelector('#fileName');
			const preview = this.shadowRoot?.querySelector('#preview') as HTMLImageElement;

			if (files && files.length > 0) {
				console.log(files);
				const file = files[0];
				if (fileName) {
					fileName.textContent = file.name;
				}

				const reader = new FileReader();
				reader.onload = function(event) {
					if (event.target && preview) {
						preview.src = event.target.result as string;
						preview.style.display = 'block';
					}
				};
				reader.readAsDataURL(file);
				postInfo.image = file;
				console.log(postInfo)
			} else {
				console.log(fileName)
				if (fileName) {
					fileName.textContent = 'No file chosen';
				}
				if (preview) {
					preview.src = '';
					preview.style.display = 'none';
				}
			}
		});

		const textArea = this.shadowRoot?.querySelector('#text-area') as HTMLElement;
		textArea.addEventListener('input', (e: Event) =>{
			const target = e.target as HTMLTextAreaElement;
			postInfo.postBody = target.value;
			postInfo.imgProfile = auth.currentUser?.photoURL || '';
			postInfo.user = auth.currentUser?.displayName || '';
			console.log(JSON.stringify(postInfo))
		})

		const form = this.shadowRoot?.querySelector('form');
		form?.addEventListener('submit', this.onSubmitButton.bind(this));

		const cssCreate = this.ownerDocument.createElement('style');
		cssCreate.innerHTML = stylesCreate;
		this.shadowRoot?.appendChild(cssCreate);

		/*const imgPhoto = document.createElement('img');
		imgPhoto.innerHTML = photo1;
		this.shadowRoot?.appendChild(imgPhoto);*/
	}
}

export default Create;
customElements.define('my-create', Create);
