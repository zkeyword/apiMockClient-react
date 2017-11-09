import request from '../utils/request'

export function list({ page, pageSize, projectId }) {
    return request(`/v0.1/api/interfaces`, {
        method: 'GET',
        page,
        pageSize,
        projectId
    })
}

export function create(values) {
    console.log(values)
    return request(`/v0.1/api/interfaces`, {
        method: 'POST',
        data: values
    })
}

export function modify(data) {
    console.log(data)
    return request(`/v0.1/api/interfaces/${data.id}`, {
        method: 'PUT',
        data
    })
}

export function remove(values) {
    console.log(values)
    return request(`/v0.1/api/interfaces/${values.id}`, {
        method: 'DELETE',
        data: values
    })
}

export function fetch({ id }) {
    return request(`/v0.1/api/interfaces/${id}`)
}
