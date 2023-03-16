import {html, LitElement} from '@lion/core'
import styles from './FormValidationResult.styles'
import '@lion/ui/define/lion-tabs.js'

export class FormValidationResult extends LitElement {
    static styles = styles
    static properties = {
        results: {type: Array},
    }

    render() {
        return this.results.length > 0
            ? html`
                  <div class="form-validation-result">
                      <h3 class="form-validation-result__heading">
                          Please correct fields in these steps
                      </h3>
                      <lion-tabs>
                          ${this.results.map(
                              result =>
                                  result &&
                                  html`
                                      <button slot="tab">step ${result[0].step}</button>
                                      <p slot="panel">
                                          ${result.map(el => html`<li>${el.label}</li>`)}
                                      </p>
                                  `
                          )}
                      </lion-tabs>
                  </div>
              `
            : null
    }
}

window.customElements.define('form-validation-result', FormValidationResult)
