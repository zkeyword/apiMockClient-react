import * as projectService from '../services/project'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import storage from '../utils/storage'

let formatMessage = window.formatMessage

export default {
    namespace: 'project',
    state: {
        list: [],
        page: 1,
        total: 0,
        data: {}
    },
    reducers: {
        save(state, { payload: date }) {
            return { ...state, ...date }
        }
    },
    effects: {
        *create({ payload: values }, { call, put }) {
            const data = yield call(projectService.create, values)
            if (data) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success(formatMessage({ id: 'models.submission' }), 1, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put(routerRedux.push(`/project`))
            } else {
                message.success(formatMessage({ id: 'models.fails' }))
            }
        },
        *modify({ payload: values }, { call, put }) {
            let { data } = yield call(projectService.modify, values)
            if (data) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success(formatMessage({ id: 'models.submission' }), 1, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put(routerRedux.push(`/project`))
            } else {
                message.success(formatMessage({ id: 'models.fails' }))
            }
        },
        *remove({ payload: { id, userId } }, { call, put }) {
            let { data } = yield call(projectService.remove, { id, userId })
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
            const { data } = yield call(projectService.fetch, { id })
            console.log(data)
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
        *list({ payload: { page = 1, pageSize = 0 } }, { call, put }) {
            try {
                const userId = storage.get('userId')
                const { data } = yield call(projectService.list, { page, pageSize, userId })
                if (data) {
                    yield put({
                        type: 'save',
                        payload: {
                            list: data,
                            total: 10,
                            page: 1
                        }
                    })
                } else {
                    yield put({ type: 'reset' })
                }
            } catch (error) {
                yield put(routerRedux.push(`/login`))
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
                    list: [],
                    page: 1,
                    total: 10,
                    data: {}
                }
            })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/project') {
                    dispatch({ type: 'list', payload: {} })
                }
            })
        }
    }
}
