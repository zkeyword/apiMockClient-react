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
        *list({ payload: { id } }, { call, put }) {
            const { data } = yield call(interfacesService.list, id)
            if (data && data.length !== 0) {
                yield put({
                    type: 'save',
                    payload: {
                        initStatus: 'you',
                        list: data,
                        saveid: data[0].id
                    }
                })
                yield put({
                    type: 'listPreview',
                    payload: {
                        id: data[0].id,
                        index: 0,
                        content: data[0].content
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
            // yield put({
            //     type: 'save',
            //     payload: {
            //         content: values.content
            //     }
            // })
        },
        *remove({ payload: values }, { call, put }) {
            let { data } = yield call(interfacesService.remove, values)
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
            //         id: values.id
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
        *listPreview({ payload: { id, content, index } }, { call, put }) {
            const { data } = yield call(interfacesService.preview, id)
            if (!content) {
                const data2 = yield call(interfacesService.fetch, id)
                content = data2.data.content
            }
            // console.log(data)
            yield put({
                type: 'save',
                payload: {
                    preview: data,
                    content,
                    index
                }
            })
            // console.log(this.state.content)
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
        },
        *key({ payload }, { put, select }) {
            console.log(121212)
            // yield put({
            //     type: 'modify',
            //     payload: {}
            // })
        }
    },
    subscriptions: {
        // keyEvent(dispatch) {
        //     console.log(dispatch)
        //     key('ctrl+s', (e) => {
        //         dispatch({ type: 'key', payload: {} })
        //         return false
        //     })
        // }
    }
}
