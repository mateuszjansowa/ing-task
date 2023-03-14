import {LitElement, html} from '@lion/core'
import {formConverter} from '../helpers'
import {loadDefaultFeedbackMessages} from '@lion/ui/validate-messages.js'
import '@lion/ui/define/lion-button.js'
import '@lion/ui/define/lion-button-submit.js'
import '@lion/ui/define/lion-input.js'
import '@lion/ui/define/lion-select.js'
import '@lion/ui/define/lion-option.js'

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
        loadDefaultFeedbackMessages()

        return html`<div ?hidden=${this.field.order - 1 !== this.step}>
            <h1>${name}</h1>
            ${this.form.map(field => {
                if (['text', 'number'].includes(field.type)) {
                    return html`<lion-input
                        .type=${field.type}
                        .name=${field.label}
                        .label=${field.label}
                        .validators="${field.validators}"
                        .value=${this.state[field.label]}
                    ></lion-input>`
                }
                if (field.type === 'select') {
                    return html`<lion-select
                        .name=${field.label}
                        .label=${field.label}
                        .validators="${field.validators}"
                        .value=${this.state[field.label]}
                    >
                        <select slot="input">
                            <option value select hidden>Select an option</option>
                            ${field.dataset.map(option => {
                                return html`<option .value=${option}>${option}</option>`
                            })}
                        </select>
                    </lion-select>`
                }
            })}
        </div>`
    }
}

window.customElements.define('form-step', FormStep)
