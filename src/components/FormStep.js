import {LitElement, html} from '@lion/core'
import {formConverter, isHidden} from '../helpers'
import '@lion/ui/define/lion-input.js'
import '@lion/ui/define/lion-select.js'
import '@lion/ui/define/lion-form.js'

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
        return this.shadowRoot.querySelector('lion-form')
    }

    render() {
        const {name} = this.field
        console.log(this.field.order - 1 === this.step && this.form)

        return html`<div ?hidden=${this.field.order - 1 !== this.step}>
            <lion-form>
                <h1>${name}</h1>
                <form>
                    ${this.form.map(field => {
                        if (['text', 'number'].includes(field.type)) {
                            return html`<lion-input
                                type=${field.type}
                                name=${field.label}
                                label=${field.label}
                                .validators="${field.validators}"
                                @model-value-changed=${this.#onChange}
                                ?hidden=${isHidden(field, this.state)}
                            ></lion-input>`
                        }
                        if (field.type === 'select') {
                            return html`<lion-select
                                name=${field.label}
                                label=${field.label}
                                .validators="${field.validators}"
                                @model-value-changed=${this.#onChange}
                                ?hidden=${isHidden(field, this.state)}
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
                </form>
            </lion-form>
        </div>`
    }
}

window.customElements.define('form-step', FormStep)
