import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import './index.styl'
import './index2.styl'
import { Form, Button, Modal, Input, Icon } from 'antd'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { execCommand } from './mark.js'
import 'codemirror/mode/markdown/markdown'
const FormItem = Form.Item

class InterfaceList extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'interfaces/reset'
        })
        if (this.props.id) {
            this.props.dispatch({
                type: 'interfaces/list',
                payload: {
                    id: this.props.id
                }
            })
        }
    }

    state = {
        value: '',
        visible: false,
        projectId: '',
        saveid: 0
    }

    showModal = () => {
        this.setState({
            visible: true,
            id: this.props.id
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { validateFields } = this.props.form
        validateFields((err, values) => {
            console.log(values)
            if (err) {
                console.log('Received values of form: ', values)
            }
            if (values.name) {
                let value = {
                    'projectId': this.props.id,
                    'name': values.name,
                    'content': ''
                }
                this.props.dispatch({
                    type: 'interfaces/create',
                    payload: value
                })

                this.setState({
                    visible: false
                })
            }
        })
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }

    remove = (item, i) => {
        console.log(item, i)
        let values = {
            'index': i,
            'id': item.id,
            'projectId': this.props.id
        }
        this.props.dispatch({
            type: 'interfaces/remove',
            payload: values
        })
        this.props.dispatch({
            type: 'interfaces/listPreview',
            payload: {
                id: item.id,
                index: i - 1,
                content: item.content
            }
        })
    }

    change = (i, item) => {
        this.props.dispatch({
            type: 'interfaces/listPreview',
            payload: {
                id: item.id,
                index: i,
                content: item.content
            }
        })
        this.setState({
            saveid: item.id
        })
    }

    save = (index) => {
        let values = {
            id: this.state.saveid,
            projectId: this.props.id,
            content: this.state.value,
            index
        }
        this.props.dispatch({
            type: 'interfaces/modify',
            payload: values
        })
    }

    render() {
        let {
            interfaces: {
                list,
            preview,
            initStatus,
            content,
            index
            },
            form: { getFieldDecorator }
        } = this.props
        let options = {
            indentUnit: 4,
            tabSize: 4,
            lineNumbers: true,
            mode: 'markdown',
            theme: 'material'
        }

        return (
            <div className='page-device'>
                <div className='lt-left'>
                    <div className='header'>
                        <span className='name'>接口类型名</span>
                        {/* <span className='btn' onClick={this.showModal}>+</span> */}
                        <Icon className='btn add' onClick={this.showModal} type='plus' />
                    </div>
                    {
                        list.map((item, i) => {
                            return (
                                <div key={i} className={index === i ? 'list currer' : 'list'} onClick={this.change.bind(null, i, item)}>
                                    <span className='name'>{item.name}</span>
                                    {/* <span className='btn' onClick={this.remove.bind(null, item.id)} >x</span> */}
                                    <Icon type='delete' className='btn' onClick={this.remove.bind(null, item, i)} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='container'>
                    <div className='bottonWrap'>
                        <Button type='primary' className='submit' onClick={this.save.bind(null, index)}>
                            保存
                        </Button>
                        <div className='box mockjs'>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'String' })}>String</div>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'Number' })}>Number</div>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'Boolean' })}>Boolean</div>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'Array' })}>Array</div>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'Object' })}>Object</div>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'Image' })}>Image</div>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'Date' })}>Date</div>
                        </div>
                        <div className='box apiblueprint'>
                            <div onClick={execCommand.bind(this, { type: 'api', value: 'GET' })}>GET</div>
                            <div onClick={execCommand.bind(this, { type: 'api', value: 'POST' })}>POST</div>
                            <div onClick={execCommand.bind(this, { type: 'api', value: 'DELETE' })}>DELETE</div>
                            <div onClick={execCommand.bind(this, { type: 'api', value: 'PUT' })}>PUT</div>
                            <div onClick={execCommand.bind(this, { type: 'api', value: 'PATCH' })}>PATCH</div>
                        </div>
                    </div>
                    <CodeMirror
                        ref={(cm) => { this.codeMirror = cm }}
                        value={content}
                        options={options}
                        onChange={(editor, data, value) => {
                            this.setState({ value })
                        }}
                    />
                    <Modal
                        title='添加接口'
                        visible={this.state.visible || initStatus === 'kong'}
                        onOk={this.handleSubmit}
                        onCancel={this.handleCancel}
                    >
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {
                                    getFieldDecorator('name', {
                                        initialValue: '',
                                        rules: [{
                                            required: true,
                                            message: '必填项'
                                        }]
                                    })(<Input size='large' placeholder='接口名称' />)
                                }
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
                <div dangerouslySetInnerHTML={{
                    __html: preview
                }} className='preview' />
            </div >
        )
    }
}

export default injectIntl(connect(({ interfaces }) => ({ interfaces }))(Form.create()(InterfaceList)), {
    withRef: true
})
