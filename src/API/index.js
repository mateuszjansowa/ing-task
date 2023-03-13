export class API {
    #url

    constructor() {
        this.#url = 'http://localhost:3000/simple-form'
    }

    async getData() {
        try {
            const response = await fetch(this.#url)
            const data = await response.json()
            return data
        } catch (error) {
            throw new Error('Failed fetching the data', error)
        }
    }
}
