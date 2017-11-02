import request from '../utils/request'

export function create(values) {
    return request(`/resources-service/v0.1/products`, {
        method: 'POST',
        data: values
    })
}

export function remove(id) {
    return request(`/resources-service/v0.1/products/${id}`, {
        method: 'DELETE'
    })
}

export function modify(data) {
    return request(`/resources-service/v0.1/products/${data.id}`, {
        method: 'PUT',
        data
    })
}

export function fetch(id) {
    // return request(`/device/${id}`)
    return request(`/resources-service/v0.1/products/${id}`)
}

export function list({ page, pageSize, name, category }) {
    return request(`/resources-service/v0.1/products?page=${Number(page) - 1}&size=${pageSize}&category=${category || ''}&name=${name || ''}`)
}
