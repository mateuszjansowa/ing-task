import {html, LitElement} from '@lion/core'
import '@lion/ui/define/lion-button.js'
import '@lion/ui/define/lion-form.js'

export class MultiStepForm extends LitElement {
    static properties = {
        step: {type: Number},
    }

    constructor() {
        super()
        this.step = 1
    }

    render() {
        return html`
            <lion-form>
                <form>
                    <lion-button>BUTTON</lion-button>
                </form>
            </lion-form>
        `
    }
}

window.customElements.define('multi-step-form', MultiStepForm)
