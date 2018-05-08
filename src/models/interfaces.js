import * as interfacesService from '../services/interfaces'
import * as historyService from '../services/history'
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
        template: {},
        initStatus: 'init',
        saveid: '',
        currer: 0,
        itemid: 0,
        historyList: [],
        historyListShow: false
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
                type: 'list',
                payload: {
                    id: values.projectId,
                    index: values.index
                }
            })
        },
        *list({ payload: { id } }, { call, put, select }) {
            const data = yield call(interfacesService.list, id)
            const state = yield select(state => state.interfaces)
            let index = state.currer
            if (data && data.data.length !== 0) {
                let item = data.data[index]
                yield put({
                    type: 'save',
                    payload: {
                        initStatus: 'you',
                        list: data.data,
                        saveid: item.id,
                        content: item.content,
                        template: {
                            request: item.request,
                            response: item.response
                        }
                    }
                })
                yield put({
                    type: 'listPreview',
                    payload: {
                        id: item.id,
                        index
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
        *historyList({ payload: { id } }, { call, put }) {
            const data = yield call(historyService.list, id)
            if (data) {
                yield put({
                    type: 'save',
                    payload: {
                        historyList: data.data
                    }
                })
            }
        },
        *historyListShow(_, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    historyListShow: true
                }
            })
        },
        *historyListClear(_, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    historyList: []
                }
            })
        },
        *historyListShowhide(_, { call, put }) {
            yield put({
                type: 'save',
                payload: {
                    historyListShow: false
                }
            })
        },
        *historyPost({ payload: values }, { call, put }) {
            yield call(historyService.add, values)
        },
        *historyDetail({ payload: { interfaceId, id } }, { call, put }) {
            const data = yield call(historyService.detail, interfaceId, id)
            if (data) {
                yield put({
                    type: 'save',
                    payload: {
                        preview: data.data.content,
                        content: data.data.content
                    }
                })
            }
        },
        *listPreview({ payload: { id, index } }, { call, put }) {
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
                    content: data.content,
                    template: {
                        request: data.request,
                        response: data.response
                    }
                }
            })
        },
        *curstate({ payload: { i, itemid } }, { select, put }) {
            yield put({
                type: 'save',
                payload: {
                    currer: i,
                    itemid
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
                    template: {},
                    index: '',
                    historyList: [],
                    historyListShow: false
                }
            })
        },
        *back({ payload }, { put, select }) {
            yield put(routerRedux.push(`/project`))
        }
    }
}
