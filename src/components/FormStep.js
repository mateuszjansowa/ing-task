import {LitElement, html} from '@lion/core'
import {formConverter, isHidden} from '../helpers'
import '@lion/ui/define/lion-input.js'
import '@lion/ui/define/lion-select.js'
import '@lion/ui/define/lion-form.js'
import '@lion/ui/define/lion-input-amount.js'

export default class FormStep extends LitElement {
    static properties = {
        form: {type: Array},
        step: {type: Number},
        state: {type: Object, state: true},
    }

    constructor() {
        super()
        this.state = {}
    }

    connectedCallback() {
        super.connectedCallback()
        this.form = formConverter(this.field.form)
    }

    #onChange = e => {
        const {name, value} = e.target
        this.state = {...this.state, [name]: value}
    }

    get lionForm() {
        if (this.shadowRoot.querySelector('lion-form')) {
            return this.shadowRoot.querySelector('lion-form')
        }

        throw new Error('No lion-form found in shadowRoot')
    }

    render() {
        const isCurrentStep = this.field.order - 1 === this.step

        return html`<div ?hidden=${!isCurrentStep}>
            <lion-form>
                <h1>${this.field.name}</h1>
                <form>
                    ${this.form.map(field => {
                        if (isHidden(field, this.state)) {
                            return
                        }

                        if (['text'].includes(field.type)) {
                            return html`<lion-input
                                name=${field.id}
                                label=${field.label}
                                .validators="${field.validators}"
                                @model-value-changed=${this.#onChange}
                            ></lion-input>`
                        }

                        if (['select'].includes(field.type)) {
                            return html`<lion-select
                                name=${field.id}
                                label=${field.label}
                                .validators="${field.validators}"
                                @model-value-changed=${this.#onChange}
                            >
                                <select slot="input">
                                    <option value select hidden>Select an option</option>
                                    ${field.dataset.map(option => {
                                        return html`<option .value=${option}>${option}</option>`
                                    })}
                                </select>
                            </lion-select>`
                        }

                        if (['number'].includes(field.type)) {
                            return html`<lion-input-amount
                                name=${field.id}
                                label=${field.label}
                                .validators="${field.validators}"
                                @model-value-changed=${this.#onChange}
                            >
                            </lion-input-amount>`
                        }
                    })}
                </form>
            </lion-form>
        </div>`
    }
}

window.customElements.define('form-step', FormStep)
