import {Task} from '@lit-labs/task'
import {SimpleFormAPI} from '../../Provider/SimpleFormAPI'
import {prepareForm} from '../../helpers/form/prepareForm'

export class MultiStepFormController {
    host

    constructor(host) {
        this.host = host
        host.addController(this)
        this.api = new SimpleFormAPI()
        this.task = new Task(
            host,
            async () => this.api.getData(),
            () => []
        )
    }

    createFormFrom(field) {
        return prepareForm(field.form)
    }
    // called when the host is connected
    // called after creating the renderRoot
    // used for adding event listeners, observers
    hostConnected() {}

    // called between update() and render()
    // useful for animations
    hostUpdate() {}

    // called after updates
    // used for reading DOM after modifications
    hostUpdated() {}

    // called when the host is disconnected
    // used for removing event listeners, observers
    hostDisconnected() {}

    render(renderFunction) {
        return this.task.render(renderFunction)
    }
}
