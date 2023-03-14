import {LitElement, html} from 'lit-element'
import '@lion/ui/define/lion-button.js'
import '@lion/ui/define/lion-button-submit.js'

export default class FormStep extends LitElement {
    static properties = {
        field: {type: Object},
        step: {type: Number},
    }

    render() {
        const {name} = this.field
        return html`<div ?hidden=${this.field.order - 1 !== this.step}>
            <h1>${name}</h1>
        </div>`
    }
}

window.customElements.define('form-step', FormStep)
