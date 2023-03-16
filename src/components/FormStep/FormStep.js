import {LitElement, html} from '@lion/core'
import {formConverter, isHidden} from '../../helpers'
import '@lion/ui/define/lion-input.js'
import '@lion/ui/define/lion-select.js'
import '@lion/ui/define/lion-form.js'
import '@lion/ui/define/lion-input-amount.js'
import styles from './FormStep.styles'

export default class FormStep extends LitElement {
    static styles = styles
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
                <div class="form__header">
                    <h1 class="form__title">${this.field.name}</h1>
                    <h5 class="form__subtitle">Fill out the form to register your account</h5>
                </div>
                <form class="form__fields">
                    ${this.form.map(field => {
                        if (isHidden(field, this.state)) {
                            return
                        }

                        if (['text'].includes(field.type)) {
                            return html`<lion-input
                                class="form__field"
                                name=${field.id}
                                label=${field.label}
                                .validators="${field.validators}"
                                @model-value-changed=${this.#onChange}
                            ></lion-input>`
                        }

                        if (['select'].includes(field.type)) {
                            return html`<lion-select
                                class="form__field"
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
                                class="form__field form__field--amount"
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
