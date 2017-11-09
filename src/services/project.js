import request from '../utils/request'

export function list({ page, pageSize, userId }) {
    return request(`/v0.1/api/project`, {
        method: 'GET',
        page,
        pageSize,
        userId
    })
}

export function create(values) {
    return request(`/v0.1/api/project`, {
        method: 'POST',
        data: values
    })
}

export function modify(data) {
    return request(`/v0.1/api/project/${data.id}`, {
        method: 'PUT',
        data
    })
}

export function remove(values) {
    return request(`/v0.1/api/project/${values.id}`, {
        method: 'DELETE',
        data: values
    })
}

export function fetch({ id }) {
    return request(`/v0.1/api/project/${id}`)
}
