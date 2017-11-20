import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import './index.styl'
import './index2.styl'
import { Form, Button, Modal, Input } from 'antd'
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { execCommand } from './mark.js'
import 'codemirror/mode/markdown/markdown'
// import { Link } from 'dva/router'
const { TextArea } = Input

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
        value: '',
        visible: false,
        projectId: '',
        i: 0,
        saveid: ''
    }

    showModal = () => {
        this.setState({
            visible: true,
            id: this.props.id
        })
    }

    handleOk = (e) => {
        let name = document.getElementById('name').value
        let content = document.getElementById('content').value
        let values = {
            'projectId': this.props.id,
            'name': name,
            'content': content
        }
        this.props.dispatch({
            type: 'interfaces/create',
            payload: values
        })
        this.setState({
            visible: false
        })
        this.props.dispatch({
            type: 'interfaces/list',
            payload: {
                id: this.props.id
            }
        })
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }

    remove = id => {
        let values = {
            'id': id,
            'projectId': { 'projectId': this.props.id }
        }
        this.props.dispatch({
            type: 'interfaces/remove',
            payload: values
        })
    }

    change = (i, item) => {
        console.log(i)
        this.setState({
            i: i,
            saveid: item.id
        })
    }

    save = () => {
        let values = {
            id: this.state.saveid,
            projectId: this.props.id,
            content: this.state.value
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
            preview
        }
        } = this.props
        let options = {
            indentUnit: 4,
            tabSize: 4,
            lineNumbers: true,
            mode: 'markdown',
            theme: 'material'
        }
        let content = list.length ? list[this.state.i].content : ''
        console.log(preview)
        // console.log(content)
        // console.log(list)
        return (
            <div className='page-device'>
                <div className='lt-left'>
                    <div className='header'>
                        <span className='name'>接口类型名</span>
                        <span className='btn' onClick={this.showModal}>+</span>
                    </div>
                    {/* <div className={this.state.i === 0 ? 'list currer' : 'list'} onClick={this.change.bind(null, 0)}>
                        <span className='name'>jjhj</span>
                        <span className='btn' >x</span>
                    </div>
                    <div className={this.state.i === 1 ? 'list currer' : 'list'} onClick={this.change.bind(null, 1)}>
                        <span className='name'>jjhj</span>
                        <span className='btn' >x</span>
                    </div> */}
                    {
                        list.map((item, i) => {
                            return (
                                <div key={i} className={this.state.i === i ? 'list currer' : 'list'} onClick={this.change.bind(null, i, item)}>
                                    <span className='name'>{item.name}</span>
                                    <span className='btn' onClick={this.remove.bind(null, item.id)} >x</span>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='container'>
                    <div className='bottonWrap'>
                        <Button type='primary' className='submit' onClick={this.save.bind(null, list.id)}>
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
                        visible={this.state.visible}
                        onOk={this.handleOk.bind(null, this)}
                        onCancel={this.handleCancel}
                    >
                        <Input size='large' placeholder='接口名称' id='name' />
                        <TextArea placeholder='接口内容' id='content' autosize={{ minRows: 2, maxRows: 6 }} style={{ display: 'none' }} />
                    </Modal>
                    {/* <CodeMirror ref='editor' value={this.state.code} onChange={this.updateCode} options={options} /> */}
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
