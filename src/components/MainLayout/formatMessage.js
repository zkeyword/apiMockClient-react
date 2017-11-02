import React from 'react'
import { injectIntl } from 'react-intl'

class Test extends React.Component {
    constructor(props) {
        super(props)
        let { formatMessage } = this.props.intl
        window.formatMessage = formatMessage
    }
    render() {
        return (
            null
        )
    }
}

export default injectIntl((Test), {
    withRef: true
})
