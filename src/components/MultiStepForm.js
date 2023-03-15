import {html, LitElement} from '@lion/core'
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
        fieldsFromJSON: {type: Array, state: true},
    }

    constructor() {
        super()
        this.step = 0
        this.fieldsFromJSON = []
    }

    connectedCallback() {
        super.connectedCallback()
        api.getData().then(data => {
            this.fieldsFromJSON = data
        })
    }

    renderButton = () =>
        ({
            0: html`<lion-button @click=${() => this.step++}> Next </lion-button>`,
            1: html`<lion-button @click=${() => this.step--}> Previous </lion-button>
                <lion-button-submit @click=${this.submitViaJS}> Submit </lion-button-submit>`,
            2: html`<h1>Thanks for filling out the form!</h1>`,
        }[this.step])

    renderSteps = () =>
        this.fieldsFromJSON.map(
            field => html` <form-step .field=${field} .step=${this.step}></form-step>`
        )

    render() {
        return html`
            <lion-form @submit=${this.onSubmit}>
                <form>
                    ${this.renderSteps()}
                    <div>${this.renderButton()}</div>
                </form>
            </lion-form>
        `
    }

    onSubmit = e => {
        e.preventDefault()
        const formData = new FormData()
        const formSteps = this.shadowRoot.querySelectorAll('form-step')
        if (formSteps && formSteps.length > 0) {
            for (const formStep of formSteps) {
                const stepFormData = new FormData(formStep.shadowRoot.querySelector('form'))
                for (const [key, value] of stepFormData.entries()) {
                    formData.append(key, value)
                }
            }
        }

        for (const [key, value] of formData.entries()) {
            console.log(key, value)
        }
    }
}

window.customElements.define('multi-step-form', MultiStepForm)
