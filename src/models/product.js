import { routerRedux } from 'dva/router'
import { message } from 'antd'
import * as productsService from '../services/product'

export default {
    namespace: 'product',
    state: {
        list: [],
        page: 1,
        total: 0,
        categoryData: [],
        category: '',
        data: {}
    },
    reducers: {
        save(state, { payload: data }) {
            return { ...state, ...data }
        }
    },
    effects: {
        *create({ payload }, { call, put }) {
            const { data: { id } } = yield call(productsService.create, payload)
            if (id) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success('提交成功', 1, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put(routerRedux.push(`/product`))
            } else {
                message.success('提交失败，请重试！')
            }
        },
        *remove({ payload: id }, { call, put }) {
            yield call(productsService.remove, id)
            let promise = () => new Promise((resolve, reject) => {
                message.success('提交成功', 1, () => {
                    resolve()
                })
            })
            yield call(promise)
            yield put({ type: 'reload' })
        },
        *modify({ payload }, { call, put }) {
            let { data } = yield call(productsService.modify, payload)
            if (data) {
                let promise = () => new Promise((resolve, reject) => {
                    message.success('提交成功', 1, () => {
                        resolve()
                    })
                })
                yield call(promise)
                yield put(routerRedux.push(`/product`))
            }
        },
        *fetch({ payload: { id } }, { call, put }) {
            const { data } = yield call(productsService.fetch, id)
            yield put({
                type: 'save',
                payload: {
                    data
                }
            })
        },
        *list({ payload: { page = 1, pageSize = 10, name, category } }, { call, put }) {
            const { data } = yield call(productsService.list, { page, pageSize, name, category })
            if (data && data.total) {
                yield put({
                    type: 'save',
                    payload: {
                        list: data.items,
                        total: data.total,
                        page: data.page + 1
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
        *reset(action, { put }) {
            yield put({
                type: 'save',
                payload: {
                    list: [],
                    page: 1,
                    total: 0,
                    data: {}
                }
            })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === '/product') {
                    dispatch({ type: 'list', payload: {} })
                }
            })
        }
    }
}
