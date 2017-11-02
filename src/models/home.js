import { routerRedux } from 'dva/router'

export default {
    namespace: 'home',
    state: {
        dd: 'xx'
    },
    reducers: {
    },
    effects: {
        *jump({ payload }, { call, put }) {
            yield put(routerRedux.push({ pathname: `/product` }))
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
            })
        }
    }
}
