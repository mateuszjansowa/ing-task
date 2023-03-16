import {html, LitElement} from '@lion/core'

export class FormValidationResult extends LitElement {
    static properties = {
        results: {type: Array},
    }

    render() {
        return html`
            <div class="form-validation-result">
                <ul>
                    ${this.results.map(
                        result =>
                            result &&
                            html`
                                <p>step ${result[0].step}</p>
                                ${result.map(el => html`<li>${el.label}</li>`)}
                            `
                    )}
                </ul>
            </div>
        `
    }
}

window.customElements.define('form-validation-result', FormValidationResult)
