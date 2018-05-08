import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import MainLayout from '../../components/MainLayout/MainLayout'
import InterfacesList from '../../components/interfaces'

class Interfaces extends React.Component {
    render() {
        let {
            location,
            match: { params }
        } = this.props
        console.log(this.props.match)
        return (
            <MainLayout location={location}>
                <InterfacesList {...params} />
            </MainLayout>
        )
    }
}

export default injectIntl(connect()(Interfaces), {
    withRef: true
})
