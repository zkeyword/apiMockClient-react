import { routerRedux } from 'dva/router'
import * as loginService from '../services/login'
import storage from '../utils/storage'

export default {
    namespace: 'login',
    state: {
        userId: '',
        accessToken: '',
        expiresAt: '',
        refreshToken: '',
        serverTime: ''
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *auth({ payload }, { call, put }) {
            const { data } = yield call(loginService.login, payload)
            yield put({
                type: 'save',
                payload: data
            })
            yield put(routerRedux.push(`/project`))
        },
        *logout({ payload }, { call, put }) {
            yield call(loginService.logout)
            yield put({ type: 'reset' })
        },
        *reset(action, { put }) {
            yield put({
                type: 'save',
                payload: {
                    userId: '',
                    accessToken: '',
                    expiresAt: '',
                    refreshToken: '',
                    serverTime: ''
                }
            })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/login') {
                    if (storage.get('accessToken')) {
                        dispatch({ type: 'logout' })
                        storage.remove('accessToken')
                    }
                }
            })
        }
    }
}
