import React from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
import { Link } from 'dva/router'
import { injectIntl } from 'react-intl'
import './index.styl'

class InterfaceList extends React.Component {
    render() {
        let {
            intl: {
                formatMessage
            }
        } = this.props
        return (
            <div className='page-interface'>
                <Link to='/interface/detail'><Button type='primary' >{formatMessage({ id: 'button.add' })}</Button></Link>
            </div>
        )
    }
}

export default injectIntl(connect()(InterfaceList), {
    withRef: true
})
