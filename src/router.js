import React from 'react'
import { Router, Switch, Route, Redirect } from 'dva/router'
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
            path: '/project/detail/:id',
            models: () => [import('./models/project')],
            component: () => import('./routes/project/detail')
        },
        /* 接口管理 */
        {
            path: '/interfaces/:id',
            // models: () => [import('./models/interfaces')],
            component: () => import('./routes/interfaces/')
        },
        {
            path: '/interfaces/:id/detail',
            // models: () => [import('./models/interfaces')],
            component: () => import('./routes/interfaces/detail')
        },
        {
            path: '/interfaces/:id/detail/:id',
            // models: () => [import('./models/interfaces')],
            component: () => import('./routes/interfaces/detail')
        }
    ]

    return (
        <div>
            <FormatMessage />
            <Router history={history}>
                <Switch>
                    {/* <Route path='/modelsBoard/detail(/:id)' component={modelsBoardDetail} /> */}
                    <Route exact path='/' render={() => (<Redirect to='/project' />)} />
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
