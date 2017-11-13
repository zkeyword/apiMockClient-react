import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import './index.styl'
import { Form, Button } from 'antd'
import { Link } from 'dva/router'
import { ReactMde } from 'react-mde'
import { commands } from './mark.js'

class InterfaceList extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'interfaces/list',
            payload: {
                id: this.props.id
            }
        })
    }

    state = {
        isLoad: false,
        mdeValue: {
            text: '',
            selection: null
        }
    }

    handleValueChange(value) {
        this.setState({ isLoad: true, mdeValue: value })
    }

    componentDidUpdate() {
        let list = this.props.interfaces.list
        if (list.length && !this.state.isLoad) {
            this.handleValueChange({
                text: list[0].content
            })
        }
    }

    render() {
        let {
            interfaces: {
                list,
            preview
            },
            intl: {
                formatMessage
            }
        } = this.props
        return (
            <div className='container'>
                <div className='lt-left'>
                    {
                        list.map((item, i) => {
                            return (
                                <div key={i}>
                                    接口名：{item.name}
                                </div>
                            )
                        })
                    }
                </div>
                <div className='lt-right'>
                    <div className='ui-btnBar'>
                        <Button type='primary'>{formatMessage({ id: 'button.save' })}</Button>
                    </div>
                    <div className='ui-btnBar' >
                        <Link to='/'>
                            <Button type='primary'>{formatMessage({ id: 'button.add' })}</Button>
                        </Link>
                    </div>
                    <ReactMde
                        textareaId='ta1'
                        textareaName='ta1'
                        value={this.state.mdeValue}
                        onChange={this.handleValueChange.bind(this)}
                        commands={commands}
                    />
                    <div dangerouslySetInnerHTML={{
                        __html: preview
                    }} />
                </div>
            </div>
        )
    }
}

export default injectIntl(connect(({ interfaces }) => ({ interfaces }))(Form.create()(InterfaceList)), {
    withRef: true
})
