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
        /* 项目管理 */
        {
            path: '/project',
            models: () => [import('./models/project')],
            component: () => import('./routes/project/')
        },
        {
            path: '/project/detail',
            models: () => [import('./models/project')],
            component: () => import('./routes/project/detail')
        },
        {
            path: '/product/detail/:id',
            models: () => [import('./models/project')],
            component: () => import('./routes/project/detail')
        },
        /* 接口管理 */
        {
            path: '/interface/:id',
            // models: () => [import('./models/interface')],
            component: () => import('./routes/interface/')
        },
        {
            path: '/interface/:id/detail',
            // models: () => [import('./models/interface')],
            component: () => import('./routes/interface/detail')
        },
        {
            path: '/interface/:id/detail/:id',
            // models: () => [import('./models/interface')],
            component: () => import('./routes/interface/detail')
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
