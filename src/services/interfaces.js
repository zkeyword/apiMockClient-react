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

export function modify(values) {
    return request(`/v0.1/api/interfaces/${values.id}`, {
        method: 'PUT',
        data: values
    })
}

export function remove(values) {
    return request(`/v0.1/api/interfaces/${values.id}`, {
        method: 'DELETE',
        data: values
    })
}

export function fetch(id) {
    return request(`/v0.1/api/interfaces/content/${id}`)
}

export function preview(id) {
    return request(`/v0.1/api/interfaces/preview/${id}`)
}
