import * as interfacesService from '../services/interfaces'
import { message } from 'antd'

let formatMessage = window.formatMessage

export default {
    namespace: 'interfaces',
    state: {
        list: [],
        preview: '',
        index: '',
        content: '',
        initStatus: 'init'
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
            } else {
                message.success(formatMessage({ id: 'models.fails' }))
            }
            yield put({
                type: 'list',
                payload: {
                    id: values.projectId
                }
            })
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
            if (data && data.length !== 0) {
                yield put({
                    type: 'save',
                    payload: {
                        initStatus: 'you',
                        list: data
                    }
                })
                yield put({
                    type: 'save',
                    payload: {
                        id: data[0].id,
                        content: data[0].content,
                        index: 0
                    }
                })
            } else {
                yield put({
                    type: 'save',
                    payload: {
                        initStatus: 'kong',
                        list: data
                    }
                })
            }
        },
        *modify({ payload: values }, { call, put }) {
            console.log(values)
            let { data } = yield call(interfacesService.modify, values)
            console.log(data)
            if (data) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success(formatMessage({ id: 'models.submission' }), 1, () => {
                        resolve()
                    })
                })
                yield call(promise)
            } else {
                message.success(formatMessage({ id: 'models.fails' }))
            }
            yield put({
                type: 'list',
                payload: {
                    id: values.projectId,
                    index: data.index
                }
            })
            yield put({
                type: 'listPreview',
                payload: {
                    id: values.id,
                    content: values.content,
                    index: values.index
                }
            })
        },
        *remove({ payload: values }, { call, put }) {
            let { data } = yield call(interfacesService.remove, values)
            console.log(values)
            yield put({
                type: 'save',
                payload: {
                    index: values.index
                }
            })
            yield put({
                type: 'list',
                payload: {
                    id: values.projectId
                }
            })

            // yield put({
            //     type: 'listPreview',
            //     payload: {
            //         id: values.id,
            //         // content: values.content,

            //     }
            // })
            // yield put({
            //     type: 'listPreview',
            //     payload: {
            //         id: values.projectId
            //     }
            // })
            if (data) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success('删除成功', 1, () => {
                        resolve()
                    })
                })
                yield call(promise)
            } else {
                message.success(formatMessage({ id: 'models.fails' }))
            }
        },
        *listPreview({ payload: { id, index, content } }, { call, put }) {
            const { data } = yield call(interfacesService.preview, id)
            // console.log(data)
            yield put({
                type: 'save',
                payload: {
                    preview: data,
                    index,
                    content
                }
            })
        },
        *reload({ payload }, { put, select }) {
            const state = yield select(state => state.interfaces)
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
                    list: [],
                    preview: '',
                    initStatus: 'init',
                    content: '',
                    index: ''
                }
            })
        }
    }
}
