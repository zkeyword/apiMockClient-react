import request from '../utils/request'
import storage from '../utils/storage'

export function login(values) {
    return request('/v0.1/api/auth/', {
        method: 'POST',
        data: values
    }).then(res => {
        storage.set('accessToken', res.data.accessToken)
        storage.set('userId', res.data.userId)
        return res
    })
}

export function logout() {
    storage.remove('accessToken')
    storage.remove('userId')
}
