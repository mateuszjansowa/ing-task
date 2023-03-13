import {html, LitElement} from '@lion/core'
import {Required} from '@lion/form-core'
import '@lion/ui/define/lion-button.js'
import '@lion/ui/define/lion-form.js'
import '@lion/input/define'

export class MultiStepForm extends LitElement {
    static properties = {
        step: {type: Number},
        formState: {type: Object, state: true},
    }

    constructor() {
        super()
        this.step = 0
        this.formState = {
            name: '',
            surname: '',
            pesel: '',
        }
    }

    #onNameChanged = event => {
        this.formState = {
            ...this.formState,
            name: event.target.value,
        }
    }

    step1 = html`
        <lion-input .validators=${[new Required()]} label="Name"></lion-input>
        <lion-button @click=${() => this.step++}>Next</lion-button>
    `

    render() {
        const steps = [this.step1, this.step2]

        return html`
            <lion-form>
                <form>${steps[this.step]}</form>
            </lion-form>
        `
    }
}

if (!window.customElements.get('multi-step-form')) {
    window.customElements.define('multi-step-form', MultiStepForm)
}
