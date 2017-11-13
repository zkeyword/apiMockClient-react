import React from 'react'
import { connect } from 'dva'
import Header from './Header'

function MainLayout({ children, location }) {
    return (
        <div>
            <Header location={location} />
            <div className='lt-main'>
                {children}
            </div>
        </div>
    )
}

export default connect(({ auth }) => ({ auth }))(MainLayout)
