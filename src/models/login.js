import { routerRedux } from 'dva/router'
import { message } from 'antd'
import * as loginService from '../services/login'
import storage from '../utils/storage'

let formatMessage = window.formatMessage

export default {
    namespace: 'login',
    state: {
        accessToken: '',
        algorithm: '',
        expiresAt: '',
        refreshToken: '',
        secret: '',
        serverTime: '',
        isClick: false,
        textStatus: formatMessage({ id: 'models.validation' })
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
        status(state, payload) {
            if (payload.time > 0) {
                state.textStatus = `${payload.time}s`
                state.isClick = true
            } else {
                state.textStatus = formatMessage({ id: 'models.resend' })
                state.isClick = false
            }
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
            yield put(routerRedux.push(`/device`))
        },
        *logout({ payload }, { call, put }) {
            const { data } = yield call(loginService.logout)
            yield put({
                type: 'save',
                payload: data
            })
        },
        *reset({ payload }, { call, put }) {
            const { data: { state } } = yield call(loginService.reset, payload)
            if (state === '0') {
                let promise = () => new Promise((resolve, reject) => {
                    message.success(formatMessage({ id: 'models.submission' }), 3, () => {
                        resolve()
                    })
                })
                yield call(promise)
                // yield put(routerRedux.push(`/login`))
            } else {
                message.success(formatMessage({ id: 'models.fail' }))
            }
        },
        *send({ payload }, { call, put }) {
            let { time } = payload
            if (time === 60) {
                const { data: { code } } = yield call(loginService.sendMsg, payload)
                if (code === 0) {
                    message.success(formatMessage({ id: 'models.send' }))
                }
                if (code === 22) {
                    message.error(formatMessage({ id: 'models.excess' }))
                }
            }
            yield put({ type: 'status', time })
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/login') {
                    if (storage.get('accessToken')) {
                        dispatch({ type: 'logout' })
                        storage.remove('accessToken')
                        storage.remove('secret')
                    }
                }
            })
        }
    }
}
