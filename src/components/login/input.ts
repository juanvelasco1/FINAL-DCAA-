
export interface InputProps {
    value: string;
    onChange: (value: string) => void;
}


class Input extends HTMLElement {
    private props: InputProps | undefined;
    private inputElement: HTMLInputElement | undefined;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.inputElement = this.shadowRoot!.querySelector('input')!;
        this.inputElement.addEventListener('input', this.handleChange.bind(this));
    }

    disconnectedCallback() {
        this.inputElement?.removeEventListener('input', this.handleChange.bind(this));
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'value' && oldValue !== newValue) {
            this.render();
        }
    }

    static get observedAttributes() {
        return ['value'];
    }

    private render() {
        this.shadowRoot!.innerHTML = `
      <input type="text" value="${this.getAttribute('value') || ''}">
    `;
    }

    private handleChange(event: Event) {
        this.props?.onChange((event.target as HTMLInputElement).value);
    }
}

// Registrar el componente como un elemento personalizado
export default Input;
customElements.define('custom-input', Input);
