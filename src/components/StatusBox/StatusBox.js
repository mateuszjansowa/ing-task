import {LitElement, html} from 'lit'
import {toTitleCase} from '../../helpers/utils'
import {serverState} from '../../constants'
import {when} from 'lit/directives/when.js'
import styles from './StatusBox.styles'
import 'material-icon-component/md-icon-outlined.js'

export class StatusBox extends LitElement {
    static styles = styles
    static properties = {
        formSendStatus: {type: Object, attribute: false},
    }

    #getIcon = () => {
        if (!this.formSendStatus.status) {
            return
        }

        return when(
            this.formSendStatus.status === serverState.success.status,
            () => html`<md-icon>check_circle</md-icon>`,
            () => html`<md-icon>cancel</md-icon>`
        )
    }

    render() {
        const {message, status} = this.formSendStatus
        return html`
            <div class="status-box status-box--${status} ">
                <h3>
                    <span class="status-box__heading"
                        >${this.#getIcon()} ${toTitleCase(status)}
                    </span>
                </h3>
                <p>${message}</p>
            </div>
        `
    }
}

customElements.define('status-box', StatusBox)
