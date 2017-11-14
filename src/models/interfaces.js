import * as interfacesService from '../services/interfaces'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

let formatMessage = window.formatMessage

export default {
    namespace: 'interfaces',
    state: {
        list: [],
        preview: '',
        code: ''
    },
    reducers: {
        save(state, { payload: date }) {
            return { ...state, ...date }
        }
    },
    effects: {
        *create({ payload: values }, { call, put }) {
            const data = yield call(interfacesService.create, values)
            if (data) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success(formatMessage({ id: 'models.submission' }), 1, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put(routerRedux.push(`/interfaces`))
            } else {
                message.success(formatMessage({ id: 'models.fails' }))
            }
        },
        *modify({ payload: values }, { call, put }) {
            let { data } = yield call(interfacesService.modify, values)
            if (data) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success(formatMessage({ id: 'models.submission' }), 1, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put(routerRedux.push(`/interfaces`))
            } else {
                message.success(formatMessage({ id: 'models.fails' }))
            }
        },
        *remove({ payload: { id, userId } }, { call, put }) {
            let { data } = yield call(interfacesService.remove, { id, userId })
            console.log(data)
            if (data) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success(formatMessage({ id: 'models.submission' }), 1, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put({ type: 'reload' })
            } else {
                message.success(formatMessage({ id: 'models.fails' }))
            }
        },
        *fetch({ payload: id }, { call, put }) {
            const { data } = yield call(interfacesService.fetch, { id })
            if (data) {
                yield put({
                    type: 'save',
                    payload: {
                        list: data
                    }
                })
            } else {
                yield put({ type: 'reset' })
            }
        },
        *list({ payload: { id } }, { call, put }) {
            const { data } = yield call(interfacesService.list, id)
            // const { data: preview } = yield call(interfacesService.preview, id)
            // console.log(preview)
            if (data) {
                yield put({
                    type: 'save',
                    payload: {
                        list: data
                        // ,
                        // preview
                    }
                })
            } else {
                yield put({ type: 'reset' })
            }
        },
        *reload({ payload }, { put, select }) {
            const state = yield select(state => state.product)
            yield put({
                type: 'save',
                payload
            })
            yield put({ type: 'list', payload: { ...state, ...payload } })
        },
        *reset({ action }, { put }) {
            yield put({
                type: 'save',
                payload: {
                    list: []
                }
            })
        }
    }
}
