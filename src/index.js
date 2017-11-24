import React from 'react'
import dva from 'dva'
import { IntlProvider } from 'react-intl'
import ReactDOM from 'react-dom'
import i18n from './utils/i18n'
import { hashHistory } from 'dva/router'
import createLoading from 'dva-loading'
import { message, LocaleProvider } from 'antd'
import router from './router'
import './assets/styles/index.styl'
import enUS from 'antd/lib/locale-provider/en_US'
// import auth from './models/auth'

// 1. Initialize
const app = dva({
    history: hashHistory,
    onError(e) {
        console.log(e.message)
        let msg = ''
        if (e.response.data) {
            msg = e.response.data.message ? e.response.data.message : e.message
        } else {
            msg = e.message
        }
        message.error(msg)
    }
})

// 2. Plugins
app.use(createLoading())

// 3. Model
// app.model(auth)

// 4. Router
app.router(router)

// 5. Start
const App = app.start()
ReactDOM.render(
    <IntlProvider locale={i18n.locale} messages={i18n.messages}>
        <LocaleProvider locale={i18n.locale === 'en-US' ? enUS : null}>
            <App />
        </LocaleProvider>
    </IntlProvider>,
    document.getElementById('root')
)
