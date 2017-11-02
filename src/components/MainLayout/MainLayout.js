import React from 'react'
import { connect } from 'dva'
import Header from './Header'
import Footer from './Footer'

function MainLayout({ children, location }) {
    return (
        <div>
            <Header location={location} />
            <div className='lt-main'>
                {children}
            </div>
            <Footer location={location} />
        </div>
    )
}

export default connect(({ auth }) => ({ auth }))(MainLayout)
