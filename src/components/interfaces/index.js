import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import './index.styl'
import './index2.styl'
import './preview.styl'
import { Form, Button, Modal, Input, Icon, Popconfirm, Radio } from 'antd'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { execCommand } from './mark.js'
import 'codemirror/mode/markdown/markdown'
import { Link } from 'dva/router'
import storage from '../../utils/storage'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const { TextArea } = Input

class InterfaceList extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'interfaces/reset'
        })
        if (this.props && this.props.i) {
            this.props.dispatch({
                type: 'interfaces/curstate',
                payload: {
                    i: Number(this.props.i)
                }
            })
        }
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
        // saveid: 0,
        // i: 0,
        status: true,
        radio: 0,
        item: {},
        timer: null
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.i !== this.props.i) {
            this.props.dispatch({
                type: 'interfaces/historyList',
                payload: {
                    id: nextProps.projectid
                }
            })
        }
    }

    showModal = (item) => {
        if (item.name) {
            this.setState({
                visible: true,
                id: this.props.id,
                radio: (item.request || item.response) ? 1 : 0,
                item
            }, () => {
                if (this.state.radio) {
                    this.props.form.setFieldsValue({
                        name: item.name,
                        request: item.request,
                        response: item.response
                    })
                } else {
                    this.props.form.setFieldsValue({
                        name: item.name
                    })
                }
            })
        } else {
            this.setState({
                visible: true,
                id: this.props.id,
                radio: (item.request || item.response) ? 1 : 0
            })
            this.props.form.resetFields()
        }
    }

    history = (item, i) => {
        if (this.props.interfaces.historyListShow) {
            this.props.dispatch({
                type: 'interfaces/historyListShowhide'
            })
        } else {
            this.props.dispatch({
                type: 'interfaces/historyListShow'
            })
        }
        this.props.dispatch({
            type: 'interfaces/historyList',
            payload: {
                id: item.id
            }
        })
    }

    radioChange = (e) => {
        this.setState({
            radio: e.target.value
        }, () => {
            if (e.target.value) {
                this.props.form.setFieldsValue({
                    request: this.state.item.request,
                    response: this.state.item.response
                })
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { validateFields } = this.props.form
        validateFields((err, values) => {
            if (err) return console.log('Received values of form: ', values)
            if (values.name) {
                if (!this.state.item.name) {
                    this.props.dispatch({
                        type: 'interfaces/create',
                        payload: {
                            projectId: this.props.id,
                            name: values.name,
                            content: '',
                            request: values.request,
                            response: values.response
                        }
                    })
                    this.setState({
                        visible: false
                    })
                } else {
                    this.props.dispatch({
                        type: 'interfaces/modify',
                        payload: {
                            id: this.state.item.id,
                            projectId: this.props.id,
                            name: values.name,
                            request: values.request ? values.request : '',
                            response: values.response ? values.response : ''
                        }
                    })
                    this.setState({
                        visible: false
                    })
                }
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
        this.props.form.resetFields()
    }

    change = (i, index, item) => {
        this.setState({
            saveid: item.id,
            status: false
        })
        this.props.dispatch({
            type: 'interfaces/curstate',
            payload: {
                i: index,
                itemid: item.id
            }
        })
        this.props.dispatch({
            type: 'interfaces/listPreview',
            payload: {
                id: item.id,
                index: i
            }
        })
        this.props.dispatch({
            type: 'interfaces/content',
            payload: {
                id: item.id,
                index: i
            }
        })
    }

    historyDetail = (item) => {
        this.props.dispatch({
            type: 'interfaces/historyDetail',
            payload: {
                id: item.id,
                interfaceId: this.props.projectid
            }
        })
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
        this.props.dispatch({
            type: 'interfaces/historyPost',
            payload: {
                interfaceId: this.props.projectid,
                userId: storage.get('userId'),
                content: this.state.value
            }
        })
        this.setState({
            i: this.state.i
        })
    }

    autoSave = () => {
        this.timer = setInterval(() => {
            this.save()
        }, 50000)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    onKeyDown = (editor, event) => {
        if (event.ctrlKey === true && event.keyCode === 83) {
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
                template,
                historyList,
                historyListShow
                // index
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
                        list && list.map((item, i) => {
                            let url = `/interfaces/detail/${this.props.id}/${i}/${item.id}`
                            return (
                                <Link to={url} key={i}>
                                    <div className={i === this.props.interfaces.currer && historyListShow ? 'list currer show' : 'list'} onClick={this.change.bind(null, this.props.interfaces.currer, i, item)}>
                                        <span className='name'>{item.name}</span>
                                        <div className='btn_wrap'>
                                            <Icon type='setting' className='btn' onClick={() => this.showModal(item)} />
                                            <Popconfirm title='Are you sure？' okText='Yes' cancelText='No' onConfirm={this.remove.bind(null, item, i)}>
                                                <Icon type='delete' className='btn' />
                                            </Popconfirm>
                                            <Icon type='exception' className='btn' onClick={() => this.history(item, i)} />
                                        </div>
                                    </div>
                                    <div className='twolevel'>
                                        {
                                            historyListShow && historyList && historyList.map((item, index) => {
                                                return (
                                                    <p key={item.id + Math.random()} onClick={() => this.historyDetail(item)} >{item.content}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </Link>

                            )
                        })
                    }
                </div>
                <div className='container'>
                    <div className='bottonWrap'>
                        <Button type='primary' className='submit' onClick={this.save.bind(null, this)}>
                            保存(CTRL+S)
                        </Button>
                        <div className='box mockjs'>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'String' }, template)}>String</div>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'Number' }, template)}>Number</div>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'Boolean' }, template)}>Boolean</div>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'Array' }, template)}>Array</div>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'Object' }, template)}>Object</div>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'Image' }, template)}>Image</div>
                            <div onClick={execCommand.bind(this, { type: 'mock', value: 'Date' }, template)}>Date</div>
                        </div>
                        <div className='box apiblueprint'>
                            <div onClick={execCommand.bind(this, { type: 'api', value: 'GET' }, template)}>GET</div>
                            <div onClick={execCommand.bind(this, { type: 'api', value: 'POST' }, template)}>POST</div>
                            <div onClick={execCommand.bind(this, { type: 'api', value: 'DELETE' }, template)}>DELETE</div>
                            <div onClick={execCommand.bind(this, { type: 'api', value: 'PUT' }, template)}>PUT</div>
                            <div onClick={execCommand.bind(this, { type: 'api', value: 'PATCH' }, template)}>PATCH</div>
                        </div>
                    </div>
                    <CodeMirror
                        ref={(cm) => { this.codeMirror = cm }}
                        value={content}
                        options={options}
                        autoCursor={false}
                        onChange={(editor, data, value) => {
                            this.setState({ value })
                        }}
                        onKeyDown={(editor, event) => {
                            this.onKeyDown(editor, event)
                        }}
                    />
                    <Modal
                        title='添加分类'
                        visible={this.state.visible || initStatus === 'kong'}
                        onOk={this.handleSubmit}
                        onCancel={this.handleCancel}
                    >
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                label='接口分类名'
                            >
                                {
                                    getFieldDecorator('name', {
                                        rules: [{
                                            required: true,
                                            message: '必填项'
                                        }]
                                    })(<Input size='large' placeholder='接口分类名称' />)
                                }
                            </FormItem>
                            <FormItem
                                label='快捷模板'
                            >
                                {getFieldDecorator('radio', {
                                    initialValue: this.state.radio
                                })(
                                    <RadioGroup onChange={this.radioChange}>
                                        <Radio value={0}>默认</Radio>
                                        <Radio value={1}>自定义</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            {
                                this.state.radio === 1 &&
                                <div>
                                    <FormItem
                                        label='request模板'
                                    >
                                        {
                                            getFieldDecorator('request', {
                                                rules: [{
                                                    required: true,
                                                    message: '必填项'
                                                }]
                                            })(<TextArea rows={10} placeholder='request模板' />)
                                        }
                                    </FormItem>
                                    <FormItem
                                        label='response模板'
                                    >
                                        {
                                            getFieldDecorator('response', {
                                                rules: [{
                                                    required: true,
                                                    message: '必填项'
                                                }]
                                            })(<TextArea rows={10} placeholder='response模板' />)
                                        }
                                    </FormItem>
                                </div>
                            }
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
