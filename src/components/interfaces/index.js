import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import './index.styl'
import './index2.styl'
import { Form, Button, Modal, Input, Icon, Popconfirm } from 'antd'
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
        projectId: this.props.id,
        saveid: 0,
        i: 0,
        status: true
    }

    showModal = () => {
        console.log(this)
        this.setState({
            visible: true,
            id: this.props.id
        })
        this.props.form.resetFields()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { validateFields } = this.props.form
        validateFields((err, values) => {
            if (err) return console.log('Received values of form: ', values)
            if (values.name) {
                this.props.dispatch({
                    type: 'interfaces/create',
                    payload: {
                        projectId: this.props.id,
                        name: values.name,
                        content: ''
                    }
                })
                this.setState({
                    visible: false
                })
            }
        })
    }

    handleCancel = (e) => {
        if (this.props.interfaces.initStatus === 'kong') {
            return this.props.dispatch({
                type: 'interfaces/back'
            })
        }
        this.setState({
            visible: false
        })
    }

    remove = (item, i) => {
        this.props.dispatch({
            type: 'interfaces/remove',
            payload: {
                index: i,
                id: item.id,
                projectId: this.props.id
            }
        })
    }

    change = (i, item) => {
        console.log(item.content)

        this.props.dispatch({
            type: 'interfaces/listPreview',
            payload: {
                id: item.id,
                index: i,
                content: item.content
            }
        })
        this.setState({
            saveid: item.id,
            i: i,
            status: false
        })
        console.log(item)
    }

    save = () => {
        this.props.dispatch({
            type: 'interfaces/modify',
            payload: {
                id: this.state.status ? this.props.interfaces.list[0].id : this.state.saveid,
                projectId: this.props.id,
                content: this.state.value,
                index: this.state.i
            }
        })

        this.setState({
            i: this.state.i
        })
    }
    // onblur = () => {
    //     console.log(this.status)

    // }
    // onfocus = () => {
    //     console.log(this)
    //     console.log(this.state.value)
    //     // let values = {
    //     //     id: this.state.saveid,
    //     //     content: this.state.value,
    //     //     projectId: this.props.id,
    //     //     index: this.state.i
    //     // }

    //     this.state.timer = setInterval(() => {
    //         this.save()
    //         // this.props.dispatch({ type: 'interfaces/modify', payload: values })
    //         this.setState({
    //             status: false
    //         })
    //     }, 5000)
    // }

    onKeyDown = (editor, event) => {
        if (event.ctrlKey === true && event.keyCode === 83) {
            // event.preventDefault()
            event.returnValue = false
            this.save()
        }
        return false
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
                        <Icon className='btn add' onClick={this.showModal} type='plus' />
                    </div>
                    {
                        list.map((item, i) => {
                            return (
                                <div key={i} className={index === i ? 'list currer' : 'list'} onClick={this.change.bind(null, i, item)}>
                                    <span className='name'>{item.name}</span>
                                    <Popconfirm title='Are you sure？' okText='Yes' cancelText='No' onConfirm={this.remove.bind(null, item, i)}>
                                        <Icon type='delete' className='btn' />
                                    </Popconfirm>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='container'>
                    <div className='bottonWrap'>
                        <Button type='primary' className='submit' onClick={this.save.bind(null, this)}>
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
                        onKeyDown={(editor, event) => {
                            this.onKeyDown(editor, event)
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
