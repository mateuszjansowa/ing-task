import {html, LitElement} from 'lit'
import styles from './FormLoader.styles'

export class FormLoader extends LitElement {
    static properties = {
        size: {type: String},
    }

    static styles = styles

    render() {
        return html`<div class="loader loader--${this.size}">
            <div class="loader__arc"></div>
            <div class="loader__arc"></div>
            <div class="loader__arc"></div>
        </div>`
    }
}

customElements.define('form-loader', FormLoader)
