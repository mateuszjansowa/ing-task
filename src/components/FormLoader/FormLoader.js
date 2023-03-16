import {html, LitElement} from 'lit'
import styles from './FormLoader.styles'

export class FormLoader extends LitElement {
    static styles = styles

    render() {
        return html`<div class="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>`
    }
}

customElements.define('form-loader', FormLoader)
