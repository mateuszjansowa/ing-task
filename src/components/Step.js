import {LitElement, html} from '@lion/core'
import {formConverter} from '../helpers'
import '@lion/ui/define/lion-button.js'
import '@lion/ui/define/lion-button-submit.js'
import '@lion/ui/define/lion-input.js'

export default class FormStep extends LitElement {
    static properties = {
        form: {type: Array, state: true},
        field: {type: Object},
        step: {type: Number},
        state: {type: Object},
    }

    connectedCallback() {
        super.connectedCallback()
        this.form = formConverter(this.field.form)
    }

    render() {
        const {name} = this.field
        console.log(this.form)

        return html`<div ?hidden=${this.field.order - 1 !== this.step}>
            <h1>${name}</h1>
            ${this.form.map(
                field =>
                    html`<lion-input
                        .name=${field.label}
                        .label=${field.label}
                        .validators="${field.validators}"
                        .value=${this.state[field.label]}
                    ></lion-input>`
            )}
        </div>`
    }
}

window.customElements.define('form-step', FormStep)
