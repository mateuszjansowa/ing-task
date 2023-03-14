import {html, LitElement} from '@lion/core'
import {loadDefaultFeedbackMessages} from '@lion/ui/validate-messages.js'
import {API} from '../API'
import '@lion/ui/define/lion-form.js'
import '@lion/ui/define/lion-input.js'

const api = new API()

export class MultiStepForm extends LitElement {
    static properties = {
        step: {type: Number, state: true},
        fields: {type: Array, state: true},
        formState: {type: Object, state: true},
    }

    constructor() {
        super()
        this.step = 0
        this.fields = []
        this.formState = {
            
        }
    }

    connectedCallback() {
        super.connectedCallback()
        api.getData().then(data => {
            this.fields = data
        })
    }

    step1 = html` <lion-button @click=${() => this.step++}>Next</lion-button> `

    step2 = html` <lion-button @click=${() => this.step--}>
        Previous
    </lion-button>`

    render() {
        loadDefaultFeedbackMessages()

        return html`
            <lion-form>
                <form>
                    ${this.fields.map(
                        step =>
                            html`<form-step
                                order=${step.order - 1}
                                name=${step.name}
                                .elements=${step.form}
                                .step=${this.step}
                                .state=${this.formState[step.name]}
                            ></form-step>`
                    )}
                </form>
            </lion-form>
        `
    }
}

window.customElements.define('multi-step-form', MultiStepForm)
