import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import './index2.styl'
import { Form, Button } from 'antd'
import CodeMirror from 'react-codemirror'
import { execCommand } from './mark.js'
import 'codemirror/mode/markdown/markdown'
// import { Link } from 'dva/router'
const FormItem = Form.Item

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
        code: '',
        isLoad: false
    }

    componentDidUpdate() {
        let list = this.props.interfaces.list
        if (list.length && !this.state.isLoad) {
            console.log(list[0].content)
            this.updateCode(list[0].content)
        }
    }
    // insertTextAtCursor(editor, data) {
    //     var doc = editor.getDoc()
    //     var cursor = doc.getCursor()
    //     var line = doc.getLine(cursor.line)
    //     var pos = {
    //         line: cursor.line,
    //         ch: line.length
    //     }
    //     doc.replaceRange('\n' + data + '\n', pos)
    // }
    updateCode(newCode) {
        this.setState({
            code: newCode,
            isLoad: true
        })
        console.log(newCode)
        console.log(this.state.code)
    }
    render() {
        let {
            interfaces: {
                list
            // preview
        }
        } = this.props
        // console.log(list)
        let options = {
            indentUnit: 4,
            tabSize: 4,
            lineNumbers: true,
            mode: 'markdown'
        }
        return (
            <div className='wrap'>
                <div className='lt-left'>
                    <div> 接口名：
                {
                            list.map((item, i) => {
                                return (
                                    <div key={i}>
                                        {item.name}
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                <div className='container'>
                    <Form>
                        <FormItem className='ui-btnBar'>
                            <Button type='primary' htmlType='submit'>
                                添加
                        </Button>
                            <Button type='danger' onClick={this.handleReset} className='deleColor'>
                                删除
                        </Button>
                            <Button type='primary' className='cancel-add'>
                                保存
                        </Button>
                        </FormItem>
                    </Form>
                    <div className='data_style'>
                        <div onClick={execCommand.bind(this, { type: 'mock', value: 'String' })}>String</div>
                        <div onClick={execCommand.bind(this, { type: 'mock', value: 'Number' })}>Number</div>
                        <div onClick={execCommand.bind(this, { type: 'mock', value: 'Boolean' })}>Boolean</div>
                        <div onClick={execCommand.bind(this, { type: 'mock', value: 'Array' })}>Array</div>
                        <div onClick={execCommand.bind(this, { type: 'mock', value: 'Object' })}>Object</div>
                        <div onClick={execCommand.bind(this, { type: 'mock', value: 'Image' })}>Image</div>
                        <div onClick={execCommand.bind(this, { type: 'mock', value: 'Date' })}>Date</div>
                    </div>
                    <div className='data_style'>
                        <div onClick={execCommand.bind(this, { type: 'api', value: 'GET' })}>GET</div>
                        <div onClick={execCommand.bind(this, { type: 'api', value: 'POST' })}>POST</div>
                        <div onClick={execCommand.bind(this, { type: 'api', value: 'DELETE' })}>DELETE</div>
                        <div onClick={execCommand.bind(this, { type: 'api', value: 'PUT' })}>PUT</div>
                        <div onClick={execCommand.bind(this, { type: 'api', value: 'PATCH' })}>PATCH</div>
                    </div>
                    <CodeMirror ref='editor' value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
                </div>
            </div>
        )
    }
}

export default injectIntl(connect(({ interfaces }) => ({ interfaces }))(Form.create()(InterfaceList)), {
    withRef: true
})
