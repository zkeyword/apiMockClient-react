import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'

class Footer extends React.Component {
    render() {
        let {
            intl: { formatMessage }
         } = this.props
        return (
            <div className='lt-footer' >
                <div className='left'>{formatMessage({ id: 'title.boss' })}</div>
                <div className='right'>
                    Copyright © 2016 - DynaMax - All rights reserved
                 </div>
            </div>
        )
    }
}

export default injectIntl(connect()(Footer), {
    withRef: true
})
