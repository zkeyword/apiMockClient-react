import request from '../utils/request'
import storage from '../utils/storage'

export function login(values) {
    return request('/boss/v0.1/auth/tokens', {
        method: 'POST',
        data: values
    }).then(res => {
        storage.set('accessToken', res.data.accessToken)
        storage.set('secret', res.data.secret)
        return res
    })
}

export function logout() {
    let token = storage.get('accessToken')
    return request(`/boss/v0.1/auth/tokens/${token}`, {
        method: 'DELETE'
    }).then(res => {
        storage.remove('accessToken')
        storage.remove('secret')
        return res
    })
}

export function reset(values) {
    return request('/boss/v0.1/users/password', {
        method: 'PUT',
        data: values
    })
}

export function sendMsg(values) {
    return request('/messages-service/v0.1/messages/sms/single', {
        method: 'POST',
        data: values
    })
}
