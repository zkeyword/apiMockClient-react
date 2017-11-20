import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
// import { Link } from 'dva/router'
import MainLayout from '../../components/MainLayout/MainLayout'
// import ProductSearch from '../../components/Product/search'
import ProjectList from '../../components/project/list'

class Project extends React.Component {
    render() {
        let {
            location
        } = this.props
        return (
            <MainLayout location={location}>
                <div className='page-device'>
                    <ProjectList />
                </div>
            </MainLayout>
        )
    }
}

export default injectIntl(connect()(Project), {
    withRef: true
})
