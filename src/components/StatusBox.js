import {LitElement, html, css} from 'lit'

export class StatusBox extends LitElement {
    static properties = {
        status: {type: String},
        message: {type: String},
    }


    render() {
        return html`
            <div class=${this.status}>
                <h3>${this.status}</h3>
                <p>${this.message}</p>
            </div>
        `
    }
}

customElements.define('status-box', StatusBox)
