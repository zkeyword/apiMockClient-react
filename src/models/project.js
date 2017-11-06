import * as projectService from '../services/project'
import { message } from 'antd'

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
        *remove({ patload: { id } }, { call, put }) {
            yield call(projectService.remove, { id })
            let promise = () => new Promise((resolve, reject) => {
                message.success('提交成功', 1, () => {
                    resolve()
                })
            })
            yield call(promise)
            yield put({ type: 'reload' })
        },
        *list({ payload: { page = 1, pageSize = 0, userId = 1 } }, { call, put }) {
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
