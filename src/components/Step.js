import {LitElement, html} from 'lit-element'
import '@lion/ui/define/lion-button.js'
import '@lion/ui/define/lion-button-submit.js'

export default class FormStep extends LitElement {
    static properties = {
        name: {type: String, attribute: 'name'},
        elements: {type: Object},
        step: {type: Number},
        order: {type: Number, attribute: 'order'},
        state: {type: Object},
    }

    firstUpdated() {
        console.log(this.elements)
        console.log(this.state)
    }

    render() {
        if (this.step === this.order) {
            return html`<h1>${this.name}</h1> `
        }
    }
}

window.customElements.define('form-step', FormStep)
