import {html, LitElement} from '@lion/core'
import {loadDefaultFeedbackMessages} from '@lion/ui/validate-messages.js'
import {API} from '../API'
import '@lion/ui/define/lion-button.js'
import '@lion/ui/define/lion-button-submit.js'
import '@lion/ui/define/lion-form.js'
import '@lion/ui/define/lion-input.js'
import '@lion/ui/define/lion-steps.js'

const api = new API()

export class MultiStepForm extends LitElement {
    static properties = {
        step: {type: Number},
        fields: {type: Array, state: true},
        formState: {type: Object, state: true},
    }

    constructor() {
        super()
        this.step = 0
        this.fields = []
        this.formState = {}
    }

    connectedCallback() {
        super.connectedCallback()
        api.getData().then(data => {
            this.fields = data
        })
    }

    renderButton = () =>
        ({
            0: html`<lion-button @click=${() => this.step++}>
                Next
            </lion-button>`,
            1: html`<lion-button @click=${() => this.step--}>
                    Previous
                </lion-button>
                <lion-button-submit @click=${() => this.step++}>
                    Submit
                </lion-button-submit>`,
        }[this.step])

    renderFields = () =>
        this.fields.map(
            field =>
                html`<form-step .field=${field} .step=${this.step}></form-step>`
        )

    render() {
        loadDefaultFeedbackMessages()

        return html`
            <lion-form>
                <form>
                    ${this.renderFields()}
                    <div>${this.renderButton()}</div>
                </form>
            </lion-form>
        `
    }
}

window.customElements.define('multi-step-form', MultiStepForm)
