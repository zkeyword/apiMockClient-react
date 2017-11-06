import React from 'react'
import { connect } from 'dva'
import { Breadcrumb } from 'antd'
import { injectIntl } from 'react-intl'
import { Link } from 'dva/router'
import MainLayout from '../../components/MainLayout/MainLayout'
// import ProductSearch from '../../components/Product/search'
// import UsersList from '../../components/Product/list'

class Product extends React.Component {
    render() {
        let {
            location,
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
                            <Breadcrumb.Item>{formatMessage({ id: 'nav.project' })}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {/* <ProductSearch />
                    <UsersList /> */}
                </div>
            </MainLayout>
        )
    }
}

export default injectIntl(connect()(Product), {
    withRef: true
})
