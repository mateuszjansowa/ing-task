import {API} from './API'

const api = new API()

api.getData().then(data => console.log(data))
