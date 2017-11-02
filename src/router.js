import React from 'react'
import { Router, Switch, Route } from 'dva/router'
import dynamic from 'dva/dynamic'
// import storage from './utils/storage'
import FormatMessage from './components/MainLayout/formatMessage'

function RouterConfig({ history, app }) {
    const error = dynamic({
        app,
        component: () => import('./routes/error')
    })
    // let accessToken = storage.get('Authorization')

    const routes = [
        {
            path: '/',
            component: () => import('./routes/home/')
        },
        /* 登录 */
        {
            path: '/login',
            models: () => [import('./models/login')],
            component: () => import('./routes/login/')
        },
        {
            path: '/login/forget',
            models: () => [import('./models/login')],
            component: () => import('./routes/login/forget')
        },
        {
            path: '/login/resetting',
            models: () => [import('./models/login')],
            component: () => import('./routes/login/resetting')
        },
        /* 产品管理 */
        {
            path: '/product',
            models: () => [import('./models/product')],
            component: () => import('./routes/product/')
        },
        {
            path: '/product/detail',
            models: () => [import('./models/product')],
            component: () => import('./routes/product/detail')
        },
        {
            path: '/product/detail/:id',
            models: () => [import('./models/product')],
            component: () => import('./routes/product/detail')
        },
        {
            path: '/product/detail/:id/:copy',
            models: () => [import('./models/product')],
            component: () => import('./routes/product/detail')
        }
    ]

    return (
        <div>
            <FormatMessage />
            <Router history={history}>
                <Switch>
                    {/* <Route path='/modelsBoard/detail(/:id)' component={modelsBoardDetail} /> */}
                    {/* <Route exact path='/' render={() => (<Redirect to='/home' />)} /> */}
                    {
                        routes.map(({ path, exact, ...dynamics }, key) => (
                            <Route key={key}
                                exact
                                path={path}
                                component={
                                    dynamic({
                                        app,
                                        ...dynamics
                                    })
                                }
                            />
                        ))
                    }
                    <Route component={error} />
                </Switch>
            </Router>
        </div>
    )
}

export default RouterConfig
