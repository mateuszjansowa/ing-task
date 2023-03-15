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
        validationResult: {type: Array, state: true},
    }

    constructor() {
        super()
        localize.locale = language.en
        this.api = new API()
        this.step = 0
        this.fieldsFromJSON = []
        this.validationResult = []
    }

    connectedCallback() {
        super.connectedCallback()
        this.api.getData().then(data => {
            this.fieldsFromJSON = data
        })
    }

    #nextStep = () => this.step++

    #previousStep = () => this.step--

    #renderButton = () => {
        const buttons = {
            0: html`<lion-button @click=${this.#nextStep}> Next </lion-button>`,
            1: html`<lion-button @click=${this.#previousStep}> Previous </lion-button>
                <lion-button-submit> Submit </lion-button-submit>`,
        }

        if (Object.hasOwn(buttons, this.step)) {
            return buttons[this.step]
        }
    }

    #getElementsWithError = elements => elements.filter(el => el.hasFeedbackFor.includes('error'))

    #onSubmit = e => {
        e.preventDefault()
        this.validationResult = []
        const formSteps = this.shadowRoot.querySelectorAll('form-step')

        if (!formSteps || !formSteps.length) {
            return
        }

        formSteps.forEach((formStep, index) => {
            formStep.lionForm.submit()

            const elementsWithError = this.#getElementsWithError(formStep.lionForm.formElements)

            if (!elementsWithError.length) {
                return
            }

            this.validationResult = [
                ...this.validationResult,
                [...elementsWithError].map(el => ({
                    label: el.label,
                    step: index + 1,
                })),
            ]
        })
    }

    #renderFormSteps = () =>
        this.fieldsFromJSON.map(
            field => html` <form-step .field=${field} .step=${this.step}></form-step>`
        )

    #renderValidationResult = () => {
        if (!this.validationResult.length) {
            return
        }

        return html`
            <ul>
                ${this.validationResult.map(
                    result =>
                        html`
                            <p>step ${result[0].step}</p>
                            ${result.map(el => html`<li>${el.label}</li>`)}
                        `
                )}
            </ul>
        `
    }

    render() {
        loadDefaultFeedbackMessages()

        return html`
            <form @submit=${this.#onSubmit}>
                ${this.#renderFormSteps()}
                <div>${this.#renderButton()}</div>
                <div>${this.#renderValidationResult()}</div>
            </form>
        `
    }
}

window.customElements.define('multi-step-form', MultiStepForm)
