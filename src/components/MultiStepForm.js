import {html, LitElement, css} from '@lion/core'
import {API} from '../API'
import '@lion/ui/define/lion-button.js'
import '@lion/ui/define/lion-button-submit.js'
import {localize} from '@lion/ui/localize.js'
import {language} from '../constants'
import {loadDefaultFeedbackMessages} from '@lion/ui/validate-messages.js'
import {messages, colors} from '../constants'

export class MultiStepForm extends LitElement {
    static styles = css`
        .form {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            min-width: 600px;
        }

        .buttons {
            display: flex;
            justify-content: flex-end;
            column-gap: 20px;
            margin-top: 20px;
        }

        .button {
            padding: 10px 20px;
            border-radius: 2px;
            border: 1px solid ${colors.primary};
            box-shadow: 0px 1px 2px -1px ${colors.secondary};
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            background-color: ${colors.primary};
            color: white;
        }

        .button:hover {
            color: ${colors.font};
            background-color: transparent;
        }

        .button__prev {
            border: 0;
            background-color: transparent;
            color: ${colors.primary};
            box-shadow: none;
        }
    `
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
        this.showLoader = true
    }

    connectedCallback() {
        super.connectedCallback()
        this.api
            .getData()
            .then(data => {
                this.fieldsFromJSON = data
            })
            .finally(() => (this.showLoader = false))
    }

    #nextStep = () => this.step++

    #previousStep = () => this.step--

    #renderButton = () => {
        const buttons = {
            0: html`<lion-button class="button" @click=${this.#nextStep}> Next </lion-button>`,
            1: html`<lion-button class="button button__prev" @click=${this.#previousStep}>
                    Previous
                </lion-button>
                <lion-button-submit class="button"> Submit </lion-button-submit>`,
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

        return this.showLoader
            ? html`<form-loader></form-loader>`
            : html`
                  <form @submit=${this.#onSubmit} class="form">
                      ${this.#renderFormSteps()}
                      <div class="buttons">${this.#renderButton()}</div>
                  </form>
                  <div>${this.#renderValidationResult()}</div>
                  <status-box
                      .status=${this.formSendStatus.status}
                      .message=${this.formSendStatus.message}
                  ></status-box>
              `
    }
}

window.customElements.define('multi-step-form', MultiStepForm)
