import request from '../utils/request'

export function list(projectId) {
    return request(`/v0.1/api/interfaces/${projectId}`)
}

export function create(values) {
    return request(`/v0.1/api/interfaces`, {
        method: 'POST',
        data: values
    })
}

export function modify(data) {
    return request(`/v0.1/api/interfaces/${data.id}`, {
        method: 'PUT',
        data
    })
}

export function remove(id) {
    return request(`/v0.1/api/interfaces/${id}`, {
        method: 'DELETE'
    })
}

export function fetch({ id }) {
    return request(`/v0.1/api/interfaces/${id}`)
}

export function preview(id) {
    return request(`/v0.1/api/interfaces/preview/${id}`)
}
