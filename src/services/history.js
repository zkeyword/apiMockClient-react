import request from '../utils/request'

export function list(interfaceId) {
    return request(`/v0.1/api/history/${interfaceId}`)
}

export function add(data) {
    return request(`/v0.1/api/history/${data.interfaceId}`, {
        method: 'POST',
        data: data
    })
}

export function detail(interfaceId, id) {
    console.log(444, interfaceId, id)
    return request(`/v0.1/api/history/${interfaceId}/${id}`)
}