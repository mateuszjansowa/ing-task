import {html, LitElement} from '@lion/core'
import styles from './FormValidationResult.styles'
import '@lion/ui/define/lion-tabs.js'
import '@lion/ui/define/lion-button.js'

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
                      <lion-tabs .selectedIndex=${0} class="form-validation-result__tabs">
                          ${this.results.map(
                              result =>
                                  result &&
                                  html`
                                      <lion-button
                                          class="form-validation-result__button"
                                          slot="tab"
                                      >
                                          Step ${result[0].step}
                                          <div class="form-validation-result__button__count">
                                              ${result.length}
                                          </div>
                                      </lion-button>
                                      <ul slot="panel" class="form-validation-result__list">
                                          ${result.map(
                                              el =>
                                                  html`<li
                                                      class="form-validation-result__list-item"
                                                  >
                                                      ${el.label}
                                                  </li>`
                                          )}
                                      </ul>
                                  `
                          )}
                      </lion-tabs>
                  </div>
              `
            : null
    }
}

window.customElements.define('form-validation-result', FormValidationResult)
