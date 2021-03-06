import axios from 'axios'
import storage from './storage'
import { url } from '../config'
axios.defaults.withCredentials = true
axios.defaults.baseURL = url
axios.defaults.validateStatus = false

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }

    const error = new Error(response.statusText)
    error.response = response
    throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(reqUrl, options = { method: 'GET' }) {
    delete axios.defaults.headers.common.Authorization
    if (!/\/api\/auth\/$/g.test(reqUrl)) {
        let accessToken = storage.get('accessToken')
        // let secret = storage.get('secret')
        // let fullUrl = url + reqUrl
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }
    const response = await axios(reqUrl, options).then(checkStatus)
    return response
}
