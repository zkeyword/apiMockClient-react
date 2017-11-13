import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import './index2.styl'
import { Form } from 'antd'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/markdown/markdown'

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
        code: 'sssssssssssssssssssssssssssssssssss',
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

    execCommand(data) {
        let editor = this.refs.editor.getCodeMirror()
        let obj = {
            mock: {
                'String': '"string|1-10": "★"',
                'Number': '"number|1-100": 100',
                'Boolean': '"boolean|1-2": true',
                'Object': `
"object|2": {
    "310000": "上海市",
    "320000": "江苏省",
    "330000": "浙江省",
    "340000": "安徽省"
}
                `,
                'Array': `
"array|1-10": [
    {
        "name|+1": [
        "Hello",
        "Mock.js",
        "!"
        ]
    }
]
                `,
                'Date': '@date("yyyy-MM-dd")',
                'Image': '@image("200x100")'
            },
            api: {
                'GET': `
##  添加项目 [POST /v0.1/api/project]

+ Request (application/json)

        {
            "name": "boss系统", // 项目名
            "alias": "boss", // 项目别名
            "description": "apiMock", // 描述
            "userId": "0" // 用户id
        }

+ Response 200

        {
            "id": 3,
            "name": "boss系统",
            "alias": "boss",
            "description": "apiMock",
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }                
                `,
                'POST': `
##  添加项目 [POST /v0.1/api/project]

+ Request (application/json)

        {
            "name": "boss系统", // 项目名
            "alias": "boss", // 项目别名
            "description": "apiMock", // 描述
            "userId": "0" // 用户id
        }

+ Response 200

        {
            "id": 3,
            "name": "boss系统",
            "alias": "boss",
            "description": "apiMock",
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }               
                `,
                'DELETE': `
##  添加项目 [POST /v0.1/api/project]

+ Request (application/json)

        {
            "name": "boss系统", // 项目名
            "alias": "boss", // 项目别名
            "description": "apiMock", // 描述
            "userId": "0" // 用户id
        }

+ Response 200

        {
            "id": 3,
            "name": "boss系统",
            "alias": "boss",
            "description": "apiMock",
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }               
                `,
                'PUT': `
##  添加项目 [POST /v0.1/api/project]

+ Request (application/json)

        {
            "name": "boss系统", // 项目名
            "alias": "boss", // 项目别名
            "description": "apiMock", // 描述
            "userId": "0" // 用户id
        }

+ Response 200

        {
            "id": 3,
            "name": "boss系统",
            "alias": "boss",
            "description": "apiMock",
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        }               
                `,
                'PATCH': `
##  添加项目 [POST /v0.1/api/project]

+ Request (application/json)

        {
            "name": "boss系统", // 项目名
            "alias": "boss", // 项目别名
            "description": "apiMock", // 描述
            "userId": "0" // 用户id
        }

+ Response 200

        {
            "id": 3,
            "name": "boss系统",
            "alias": "boss",
            "description": "apiMock",
            "updatedAt": "2017-10-29T02:17:12.553Z",
            "createdAt": "2017-10-29T02:17:12.553Z"
        } 
                `
            }
        }
        this.insertString(editor, obj[data.type][data.value])
    }

    insertTextAtCursor(editor, data) {
        var doc = editor.getDoc()
        var cursor = doc.getCursor()
        var line = doc.getLine(cursor.line)
        var pos = {
            line: cursor.line,
            ch: line.length
        }
        doc.replaceRange('\n' + data + '\n', pos)
    }

    insertString(editor, str) {
        var selection = editor.getSelection()

        if (selection.length > 0) {
            editor.replaceSelection(str)
        } else {
            var doc = editor.getDoc()
            var cursor = doc.getCursor()

            var pos = {
                line: cursor.line,
                ch: cursor.ch
            }

            doc.replaceRange(str, pos)
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
        let options = {
            indentUnit: 4,
            tabSize: 4,
            lineNumbers: true,
            mode: 'markdown'
        }
        console.log(preview, formatMessage)
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
                <div>
                    <div onClick={this.execCommand.bind(this, { type: 'mock', value: 'String' })}>String</div>
                    <div onClick={this.execCommand.bind(this, { type: 'mock', value: 'Number' })}>Number</div>
                    <div onClick={this.execCommand.bind(this, { type: 'mock', value: 'Boolean' })}>Boolean</div>
                    <div onClick={this.execCommand.bind(this, { type: 'mock', value: 'Array' })}>Array</div>
                    <div onClick={this.execCommand.bind(this, { type: 'mock', value: 'Object' })}>Object</div>
                    <div onClick={this.execCommand.bind(this, { type: 'mock', value: 'Image' })}>Image</div>
                    <div onClick={this.execCommand.bind(this, { type: 'mock', value: 'Date' })}>Date</div>
                </div>
                <div>
                    <div onClick={this.execCommand.bind(this, { type: 'api', value: 'GET' })}>GET</div>
                    <div onClick={this.execCommand.bind(this, { type: 'api', value: 'POST' })}>POST</div>
                    <div onClick={this.execCommand.bind(this, { type: 'api', value: 'DELETE' })}>DELETE</div>
                    <div onClick={this.execCommand.bind(this, { type: 'api', value: 'PUT' })}>PUT</div>
                    <div onClick={this.execCommand.bind(this, { type: 'api', value: 'PATCH' })}>PATCH</div>
                </div>
                <CodeMirror ref='editor' value={this.state.code} onChange={this.updateCode} options={options} />
            </div>
        )
    }
}

export default injectIntl(connect(({ interfaces }) => ({ interfaces }))(Form.create()(InterfaceList)), {
    withRef: true
})
