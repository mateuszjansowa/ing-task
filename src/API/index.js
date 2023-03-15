export class API {
    #serverUrl = 'http://localhost:3000'

    async getData() {
        try {
            const response = await fetch(`${this.#serverUrl}/simple-form`)
            const data = await response.json()
            return data
        } catch (error) {
            throw new Error('Failed fetching the data', error)
        }
    }

    async postData(data) {
        try {
            const response = await fetch(`${this.#serverUrl}/submitted`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to post the form data')
            }

            return response
        } catch (error) {
            throw new Error('Failed to post the form data', error)
        }
    }
}
