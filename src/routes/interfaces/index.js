import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { injectIntl } from 'react-intl'
import { Link } from 'dva/router'
import MainLayout from '../../components/MainLayout/MainLayout'
import InterfacesList from '../../components/interfaces'

class Interfaces extends React.Component {
    render() {
        let {
            location,
            match: { params },
            intl: {
                formatMessage
            }
        } = this.props
        return (
            <MainLayout location={location}>
                <div className='page-device'>
                    <div className='ui-breadcrumb'>
                        <Breadcrumb separator='&gt;'>
                            <Breadcrumb.Item><Link to='/'>{formatMessage({ id: 'nav.home' })}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{formatMessage({ id: 'nav.interface' })}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <InterfacesList {...params} />
                </div>
            </MainLayout>
        )
    }
}

export default injectIntl(connect()(Interfaces), {
    withRef: true
})
