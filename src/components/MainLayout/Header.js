import React from 'react'
import { Form } from 'antd'
import { injectIntl } from 'react-intl'
import { Link } from 'dva/router'

class Header extends React.Component {
    current() {
        let arr = location.pathname.split('/')
        let cur
        if (arr[1]) {
            if (arr[1] === 'system') {
                if (arr.length === 3) {
                    cur = location.pathname
                } else {
                    cur = `/${arr[1]}/${arr[2]}`
                }
            } else {
                cur = arr[1]
            }
        } else {
            cur = 'home'
        }
        return [cur]
    }

    render() {
        let { formatMessage } = this.props.intl
        return (
            <div className='lt-header' >
                <Link className='logo' to='/project' title='apiMockClient' >
                    API MOCK
                </Link>
                <div className='operating'>
                    <span>
                        {formatMessage({ id: 'operating.welcome' })}，admin | <Link to='/login'>{formatMessage({ id: 'operating.logout' })}</Link>
                    </span>
                </div>
            </div >
        )
    }
}

export default injectIntl(Form.create()(Header), {
    withRef: true
})
