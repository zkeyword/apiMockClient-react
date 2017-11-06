import request from '../utils/request'

export function list({ page, pageSize, userId }) {
    return request(`/v0.1/api/project`, {
        method: 'GET',
        page,
        pageSize,
        userId
    })
}

export function remove({ id }) {
    return request(`/v0.1/api/project/${id}`, {
        method: 'DELETE'
    })
}
