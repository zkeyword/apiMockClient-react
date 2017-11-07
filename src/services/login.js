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
    let token = storage.get('accessToken')
    return request(`/uaa-service/v0.1/auth/tokens/${token}`, {
        method: 'DELETE'
    }).then(res => {
        storage.remove('accessToken')
        storage.remove('secret')
        return res
    })
}

export function reset(values) {
    return request('/uaa-service/v0.1/users/password', {
        method: 'PUT',
        data: values
    })
}

export function sendMsg(values) {
    return request('/biz-message/v0.1/messages/sms/single', {
        method: 'POST',
        data: values
    })
}

export function authInfo() {
    return request('/v0.1/api/auth/')
}

export function checkMsg(values) {
    return request('/biz-message/v0.1/messages/sms/verifies', {
        method: 'POST',
        data: values
    })
}
