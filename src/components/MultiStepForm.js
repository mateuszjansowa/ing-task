import {html, LitElement} from '@lion/core'
import {API} from '../API'
import '@lion/ui/define/lion-button.js'
import '@lion/ui/define/lion-button-submit.js'
import {localize} from '@lion/ui/localize.js'
import {language} from '../constants'
import {loadDefaultFeedbackMessages} from '@lion/ui/validate-messages.js'
import {messages} from '../constants'

export class MultiStepForm extends LitElement {
    static properties = {
        step: {type: Number},
        fieldsFromJSON: {type: Array, state: true},
        validationResult: {type: Array, state: true},
        formSendStatus: {type: Object},
        showLoader: {type: Boolean},
    }

    constructor() {
        super()
        localize.locale = language.en
        this.api = new API()
        this.step = 0
        this.fieldsFromJSON = []
        this.validationResult = []
        this.formSendStatus = {
            status: '',
            message: '',
        }
        this.showLoader = false
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

    #validateFormStep = (formStep, index) => {
        const elementsWithError = this.#getElementsWithError(formStep.lionForm.formElements)

        if (!elementsWithError.length) {
            return
        }

        return [...elementsWithError].map(el => ({
            label: el.label,
            step: index + 1,
        }))
    }

    #sendDataToServer = formState => {
        const state = formState.reduce((acc, curr) => ({...acc, ...curr}), {})

        this.api
            .postData(state)
            .then(() => {
                this.formSendStatus = {
                    status: 'success',
                    message: messages.success,
                }
            })
            .catch(() => {
                this.formSendStatus = {
                    status: 'error',
                    message: messages.error,
                }
            })
    }

    #onSubmit = e => {
        e.preventDefault()
        this.validationResult = []
        const formState = []

        const formSteps = this.shadowRoot.querySelectorAll('form-step')

        if (!formSteps || !formSteps.length) {
            return
        }

        formSteps.forEach((formStep, index) => {
            formStep.lionForm.submit()
            formState.push(formStep.state)

            this.validationResult = [
                ...this.validationResult,
                this.#validateFormStep(formStep, index),
            ].filter(v => v)
        })

        if (this.validationResult.length) {
            return
        }

        this.#sendDataToServer(formState)
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
                        result &&
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
            <status-box
                .status=${this.formSendStatus.status}
                .message=${this.formSendStatus.message}
            ></status-box>
        `
    }
}

window.customElements.define('multi-step-form', MultiStepForm)
