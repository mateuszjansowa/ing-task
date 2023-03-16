import {LitElement, html, css} from '@lion/core'
import {formConverter, isHidden} from '../helpers'
import '@lion/ui/define/lion-input.js'
import '@lion/ui/define/lion-select.js'
import '@lion/ui/define/lion-form.js'
import '@lion/ui/define/lion-input-amount.js'
import {colors} from '../constants'

export default class FormStep extends LitElement {
    static styles = css`
        .form__header {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            flex-direction: column;
            margin: 20px 0;
        }

        .form__title {
            font-weight: 400;
            color: hsl(0, 0%, 0%);
            margin: 10px;
            padding: 0;
            text-transform: uppercase;
        }

        .form__subtitle {
            margin: 5px;
            padding: 0;
        }

        .form__fields {
            border: 1px solid hsl(0, 0%, 80%);
            border-radius: 5px;
            padding: 40px;
            box-shadow: 0px 1px 2px -1px hsl(0, 0%, 49%);
            display: flex;
            flex-direction: column;
            row-gap: 40px;
        }

        .form__field {
            display: grid;
            grid-template-columns: 35% auto;
            align-items: center;
            position: relative;
        }

        .form__field input,
        .form__field select {
            padding: 10px 5px;
            border-radius: 5px;
            background-color: transparent;
            border: 0;
            outline: 1px solid ${colors.secondary};
        }

        .form__field input:focus-visible,
        .form__field select:focus-visible {
            border: 0;
            outline: 1px solid ${colors.primary};
        }

        lion-validation-feedback {
            position: absolute;
            font-size: 0.9rem;
            color: ${colors.danger};
            padding-top: 5px;
        }
    `
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
