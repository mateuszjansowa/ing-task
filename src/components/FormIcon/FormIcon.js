import {html, LitElement} from 'lit'

export class FormIcon extends LitElement {
    static properties = {
        icon: {type: String},
    }

    constructor() {
        super()
        this.iconsUrl = 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined'
    }

    render() {
        return html` <span class="material-symbols-outlined">${this.icon}</span> `
    }
}

customElements.define('form-icon', FormIcon)
