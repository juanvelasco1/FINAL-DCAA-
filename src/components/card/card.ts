import { loadCss } from '../../utils/styles';
import stylesCard from '../card/card.css';
import { appState, dispatch } from '../../store';
import { savePostAction, unsavePostAction } from '../../store/actions';
import { getSavedPosts } from '../../utils/firebase';

export enum Attribute {
	'photo' = 'photo',
	'name' = 'name',
	'image' = 'image',
	'tag' = 'tag',
	'description' = 'description',
	'ide' = 'ide',
}

let savedPosts: { id: string }[] = [];

class Card extends HTMLElement {
	photo?: string;
	name?: string;
	image?: string;
	description?: string;
	tag?: string;
	ide?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.loadSavedPosts().then((r) => this.render());
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			photo: null,
			name: null,
			image: null,
			description: null,
			tag: null,
			ide: null,
		};

		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
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

	async saveAPost(id: string) {
		dispatch(savePostAction(id), false);
	}

	async unsaveAPost(id: string) {
		dispatch(unsavePostAction(id), false);
	}

	async loadSavedPosts() {
		const saved = await this.getSavedPostsAct();
		if (saved) {
			savedPosts = saved;
		}
	}

	async getSavedPostsAct() {
		const p = await getSavedPosts();
		return p;
	}

	render() {
		if (this.shadowRoot) {
			loadCss(this, stylesCard);
			this.shadowRoot.innerHTML = `

			<style>
			${stylesCard}
			</style>

			<link rel="stylesheet" href="../src/Components/card/card.css">

            <div class="card" id="ide1">
                <header class="card-header">
                    <img class="photo rounded-full" src="${this.photo}" alt="Photograph">
                    <h3>${this.name}</h3>
                </header>
                <main class="card-body" id="ide2">
                    <img src="${this.image}" class="image" alt="Image">
                    <section class="actions">
                        <button class="heart" type="button">
                            <img class="like" id="likeButton" src="../src/asset/like.png" alt="Like">
                        </button>


                        <button class="bookmark" type="button">
                            <img class="save" id="saveButton" src="../src/asset/save${
															this.ide && savedPosts.some((post) => post.id === this.ide) ? '-full' : ''
														}.png" alt="Save">
                        </button>
                    </section>

                    <section class="desc-section ">
                        <p class="desc">${this.description}</p>
                    </section>


                </main>
            </div>
      `;
		}

		const cssCard = this.ownerDocument.createElement('style');
		cssCard.innerHTML = stylesCard;
		this.shadowRoot?.appendChild(cssCard);

		const changeButton = this.shadowRoot?.getElementById('likeButton');

		changeButton?.addEventListener('click', function () {
			if (changeButton.getAttribute('src') === '../src/asset/like.png') {
				changeButton.setAttribute('src', '../src/asset/like-full.png');
			} else {
				changeButton.setAttribute('src', '../src/asset/like.png');
			}
		});

		const changeButtonSave = this.shadowRoot?.getElementById('saveButton');

		changeButtonSave?.addEventListener('click', () => {
			if (changeButtonSave.getAttribute('src') === '../src/asset/save.png') {
				changeButtonSave.setAttribute('src', '../src/asset/save-full.png');
				this.saveAPost(this.ide || 'null').then((r) =>
					changeButtonSave.setAttribute('src', '../src/asset/save-full.png')
				);
			} else {
				changeButtonSave.setAttribute('src', '../src/asset/save.png');
				this.unsaveAPost(this.ide || 'null').then((r) => changeButtonSave.setAttribute('src', '../src/asset/save.png'));
			}
		});

	}

}

export default Card;
customElements.define('my-card', Card);
