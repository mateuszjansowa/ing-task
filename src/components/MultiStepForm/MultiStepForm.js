import {html, LitElement} from '@lion/core'
import {Task} from '@lit-labs/task'
import {SimpleFormAPI} from '../../Provider/SimpleFormAPI'
import '@lion/ui/define/lion-button.js'
import '@lion/ui/define/lion-button-submit.js'
import {localize} from '@lion/ui/localize.js'
import {language} from '../../constants'
import {loadDefaultFeedbackMessages} from '@lion/ui/validate-messages.js'
import {serverState} from '../../constants'
import styles from './MultiStepForm.styles'

export class MultiStepForm extends LitElement {
    static styles = styles
    static properties = {
        step: {type: Number},
        fieldsFromJSON: {type: Array, state: true},
        validationResult: {type: Array, state: true},
        formSendStatus: {type: Object},
    }

    constructor() {
        super()
        localize.locale = language.en
        this.api = new SimpleFormAPI()
        this.step = 0
        // this.fieldsFromJSON = []
        this.validationResult = []
        this.formSendStatus = {
            status: '',
            message: '',
        }
    }

    connectedCallback() {
        super.connectedCallback()
    }

    #nextStep = () => this.step++

    #previousStep = () => this.step--

    #renderButton = () => {
        const buttons = {
            0: html`<lion-button class="button" @click=${this.#nextStep}> Next </lion-button>`,
            1: html`<lion-button class="button button__prev" @click=${this.#previousStep}>
                    Previous
                </lion-button>
                <lion-button-submit
                    class="button"
                    ?disabled=${this.formSendStatus.status === serverState.success.status}
                >
                    Submit
                </lion-button-submit>`,
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
                    status: serverState.success.status,
                    message: serverState.success.message,
                }
            })
            .catch(() => {
                this.formSendStatus = {
                    status: serverState.error.status,
                    message: serverState.error.message,
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

    #renderFormSteps = fields =>
        fields.map(field => html`<form-step .field=${field} .step=${this.step}></form-step>`)

    #getFormTask = new Task(
        this,
        async () => this.api.getData(),
        () => []
    )

    render() {
        loadDefaultFeedbackMessages()

        return html` ${this.#getFormTask.render({
            initial: () => html`<form-loader></form-loader>`,
            pending: () => html`<form-loader></form-loader>`,
            complete: fieldsFromJSON =>
                html`<form @submit=${this.#onSubmit} class="form">
                        ${this.#renderFormSteps(fieldsFromJSON)}
                        <div class="buttons">${this.#renderButton()}</div>
                    </form>

                    <form-validation-result
                        .results=${this.validationResult}
                    ></form-validation-result>
                    <status-box .formSendStatus=${this.formSendStatus}></status-box>`,
        })}`
    }
}

window.customElements.define('multi-step-form', MultiStepForm)
