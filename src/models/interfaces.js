import * as interfacesService from '../services/interfaces'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
// import { fetch } from '../services/interfaces';
// import key from 'keymaster'

let formatMessage = window.formatMessage

export default {
    namespace: 'interfaces',
    state: {
        list: [],
        preview: '',
        index: '',
        content: '',
        initStatus: 'init',
        saveid: ''
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
        *modify({ payload: values }, { call, put }) {
            let { data } = yield call(interfacesService.modify, values)
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
                type: 'listPreview',
                payload: {
                    id: values.id,
                    content: values.content,
                    index: values.index
                }
            })
        },
        *list({ payload: { id } }, { call, put }) {
            const { data } = yield call(interfacesService.list, id)
            if (data && data.length !== 0) {
                yield put({
                    type: 'save',
                    payload: {
                        initStatus: 'you',
                        list: data,
                        saveid: data[0].id,
                        content: data[0].content
                    }
                })
                yield put({
                    type: 'listPreview',
                    payload: {
                        id: data[0].id,
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
        *listPreview({ payload: { id, content, index } }, { call, put }) {
            let preview
            try {
                const { data } = yield call(interfacesService.preview, id)
                preview = data
            } catch (error) {
                preview = '<div style="color:red;font-size: 20px;font-weight:bold">警告：API文档的语法有错</div>'
            }

            yield put({
                type: 'save',
                payload: {
                    preview,
                    index
                }
            })
        },
        *content({ payload: { id, content, index } }, { call, put }) {
            const { data } = yield call(interfacesService.fetch, id)
            yield put({
                type: 'save',
                payload: {
                    content: data.content
                }
            })
        },
        *remove({ payload: values }, { call, put }) {
            let { data } = yield call(interfacesService.remove, values)
            let value = values.projectId
            yield put({
                type: 'listPreview',
                payload: {
                    id: value
                }
            })
            yield put({
                type: 'content',
                payload: {
                    id: value
                }
            })
            yield put({
                type: 'list',
                payload: {
                    id: value
                }
            })
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
        },
        *back({ payload }, { put, select }) {
            yield put(routerRedux.push(`/project`))
        }
    }
}
