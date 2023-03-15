import {html, LitElement} from '@lion/core'
import {API} from '../API'
import '@lion/ui/define/lion-button.js'
import '@lion/ui/define/lion-button-submit.js'
import {localize} from '@lion/ui/localize.js'
import {language} from '../constants'
import {loadDefaultFeedbackMessages} from '@lion/ui/validate-messages.js'

export class MultiStepForm extends LitElement {
    static properties = {
        step: {type: Number},
        fieldsFromJSON: {type: Array, state: true},
    }

    constructor() {
        super()
        localize.locale = language.en
        this.step = 0
        this.fieldsFromJSON = []
        this.api = new API()
    }

    connectedCallback() {
        super.connectedCallback()
        this.api.getData().then(data => {
            this.fieldsFromJSON = data
        })
    }

    #nextStep = () => this.step++

    #previousStep = () => this.step--

    renderButton = () => {
        const buttons = {
            0: html`<lion-button @click=${this.#nextStep}> Next </lion-button>`,
            1: html`<lion-button @click=${this.#previousStep}> Previous </lion-button>
                <lion-button-submit> Submit </lion-button-submit>`,
            2: html`<h1>Thanks for filling out the form!</h1>`,
        }

        if (Object.hasOwn(buttons, this.step)) {
            return buttons[this.step]
        }
    }

    #onSubmit = e => {
        e.preventDefault()
        const formSteps = this.shadowRoot.querySelectorAll('form-step')

        if (formSteps && formSteps.length > 0) {
            for (const formStep of formSteps) {
                formStep.lionForm.submit()
                // todo error detection
                if (formStep.lionForm.hasFeedbackFor.includes('error')) {
                    console.log('error')
                }
            }
        }
    }

    renderFormSteps = () =>
        this.fieldsFromJSON.map(
            field => html` <form-step .field=${field} .step=${this.step}></form-step>`
        )

    render() {
        loadDefaultFeedbackMessages()

        return html`
            <form @submit=${this.#onSubmit}>
                ${this.renderFormSteps()}
                <div>${this.renderButton()}</div>
            </form>
        `
    }
}

window.customElements.define('multi-step-form', MultiStepForm)
