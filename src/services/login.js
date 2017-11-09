import request from '../utils/request'
import storage from '../utils/storage'

export function login(values) {
    return request('/v0.1/api/auth/', {
        method: 'POST',
        data: values
    }).then(res => {
        storage.set('accessToken', res.data.accessToken)
        // storage.set('secret', res.data.secret)
        return res
    })
}

export function logout() {
    // let token = storage.get('accessToken')
    storage.remove('accessToken')
    // return request(`/uaa-service/v0.1/auth/tokens/${token}`, {
    //     method: 'DELETE'
    // }).then(res => {
    //     storage.remove('accessToken')
    //     storage.remove('secret')
    //     return res
    // })
}
