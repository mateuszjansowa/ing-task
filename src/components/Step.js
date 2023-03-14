import {LitElement, html} from '@lion/core'
import {fieldConverter} from '../helpers'

import '@lion/ui/define/lion-button.js'
import '@lion/ui/define/lion-button-submit.js'

export default class FormStep extends LitElement {
    static properties = {
        field: {type: Object},
        step: {type: Number},
        state: {type: Object},
    }

    constructor() {
        super()
    }

    connectedCallback() {
        super.connectedCallback()
        this.field = fieldConverter(this.field.form)
    }

    render() {
        const {name} = this.field
        console.log(this.field)

        return html`<div ?hidden=${this.field.order - 1 !== this.step}>
            <h1>${name}</h1>
        </div>`
    }
}

window.customElements.define('form-step', FormStep)
