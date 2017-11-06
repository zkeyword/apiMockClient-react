import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import MainLayout from '../../components/MainLayout/MainLayout'
import ProjectDetail from '../../components/project/detail'

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
                <div className='page-projectDetail'>
                    <div className='ui-breadcrumb'>
                        <Breadcrumb separator='&gt;'>
                            <Breadcrumb.Item><Link to='/'>{formatMessage({ id: 'nav.home' })}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item><Link to='/project'>{formatMessage({ id: 'nav.project' })}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{params.id ? formatMessage({ id: 'button.edit' }) : formatMessage({ id: 'button.add' })}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {<ProjectDetail {...params} />}
                </div>
            </MainLayout>
        )
    }
}

export default injectIntl(connect()(Detail), {
    withRef: true
})
