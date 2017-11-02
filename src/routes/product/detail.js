import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { injectIntl } from 'react-intl'
import { Link } from 'dva/router'
import MainLayout from '../../components/MainLayout/MainLayout'
import DeviceDetail from '../../components/Product/detail'

class Detail extends React.Component {
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
                <div className='page-deviceDetail'>
                    <div className='ui-breadcrumb'>
                        <Breadcrumb separator='&gt;'>
                            <Breadcrumb.Item><Link to='/'>{formatMessage({ id: 'nav.home' })}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{formatMessage({ id: 'nav.device' })}</Breadcrumb.Item>
                            <Breadcrumb.Item><Link to='/product'>{formatMessage({ id: 'nav.product' })}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{params.id && !params.copy ? formatMessage({ id: 'button.edit' }) : formatMessage({ id: 'button.add' })}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <DeviceDetail {...params} />
                </div>
            </MainLayout>
        )
    }
}

export default injectIntl(connect()(Detail), {
    withRef: true
})
