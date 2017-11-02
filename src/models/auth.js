import { routerRedux } from 'dva/router'
import storage from '../utils/storage'

export default {
    namespace: 'auth',
    state: {
    },
    reducers: {
    },
    effects: {
        *auth({ payload }, { call, put }) {
            let accessToken = storage.get('accessToken')
            console.log(accessToken)
            if (!accessToken) {
                yield put(routerRedux.push({ pathname: `/login` }))
            }
        },
        *info({ payload }, { call, put }) {
            // console.log(payload)
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (!/login/g.test(pathname)) {
                    dispatch({ type: 'auth' })
                }
            })
        }
    }
}
