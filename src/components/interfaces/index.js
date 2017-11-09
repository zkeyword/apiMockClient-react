import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import './index.styl'
import { Form, Button } from 'antd'
import { ReactMde, ReactMdeCommands } from 'react-mde'
import {
    insertText
} from './ReactMdeTextHelper'

function getSurroundingWord(text, position) {
    if (!text) throw Error('Argument \'text\' should be truthy')

    const isWordDelimiter = c => c === ' ' || c.charCodeAt(0) === 10

    // leftIndex is initialized to 0 because if position is 0, it won't even enter the iteration
    let leftIndex = 0
    // rightIndex is initialized to text.length because if position is equal to text.length it won't even enter the interation
    let rightIndex = text.length

    // iterate to the left
    for (let i = position; i - 1 > -1; i--) {
        if (isWordDelimiter(text[i - 1])) {
            leftIndex = i
            break
        }
    }

    // iterate to the right
    for (let i = position; i < text.length; i++) {
        if (isWordDelimiter(text[i])) {
            rightIndex = i
            break
        }
    }

    return {
        word: text.slice(leftIndex, rightIndex),
        position: [leftIndex, rightIndex]
    }
}

class InterfaceList extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'interfaces/list',
            payload: {
                projectId: this.props.id
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
                list
            },
            intl: {
                formatMessage
            }
        } = this.props

        let commands = ReactMdeCommands.getDefaultCommands()
        let arr = [
            {
                type: 'dropdown',
                icon: 'header',
                subCommands: [
                    {
                        content: <p className='header-1'>Header</p>,
                        execute: function (text, selection) {
                            var { newText, insertionLength } = insertText(text, 'string', selection[0])
                            return {
                                text: newText,
                                selection: [selection[1] + insertionLength, selection[0] + insertionLength]
                            }
                        }
                    },
                    {
                        content: <p className='header-2'>Header</p>,
                        execute: function (text, selection) {
                            if (text && text.length && selection[0] === selection[1]) {
                                // the user is pointing to a word
                                selection = getSurroundingWord(text, selection[0]).position
                            }
                            // the user is selecting a word section
                            var { newText, insertionLength } = insertText(text, '34', selection[0])
                            // newText = insertText(newText, '31', selection[1] + insertionLength).newText
                            return {
                                text: newText,
                                selection: [selection[0] + insertionLength, selection[1] + insertionLength]
                            }
                            // return makeHeader(text, selection, '#456')
                        }
                    },
                    {
                        content: <p className='header-3'>Header</p>,
                        execute: function (text, selection) {
                            if (text && text.length && selection[0] === selection[1]) {
                                // the user is pointing to a word
                                selection = getSurroundingWord(text, selection[0]).position
                            }
                            // the user is selecting a word section
                            var { newText, insertionLength } = insertText(text, '56', selection[0])
                            // newText = insertText(newText, '31', selection[1] + insertionLength).newText
                            return {
                                text: newText,
                                selection: [selection[0] + insertionLength, selection[1] + insertionLength]
                            }
                            // return makeHeader(text, selection, '#456')
                        }
                    }
                ]
            },
            {
                type: 'button',
                icon: 'bold',
                tooltip: 'Add bold text',
                execute: function (text, selection) {
                    if (text && text.length && selection[0] === selection[1]) {
                        // the user is pointing to a word
                        selection = getSurroundingWord(text, selection[0]).position
                    }
                    // the user is selecting a word section
                    var { newText, insertionLength } = insertText(text, '**', selection[0])
                    newText = insertText(newText, '**', selection[1] + insertionLength).newText
                    return {
                        text: newText,
                        selection: [selection[0] + insertionLength, selection[1] + insertionLength]
                    }
                }
            }
        ]

        // console.log(commands, arr)
        commands.splice(0, 3, arr)

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
                    <ReactMde
                        textareaId='ta1'
                        textareaName='ta1'
                        value={this.state.mdeValue}
                        onChange={this.handleValueChange.bind(this)}
                        commands={commands}
                    />
                </div>
            </div>
        )
    }
}

export default injectIntl(connect(({ interfaces }) => ({ interfaces }))(Form.create()(InterfaceList)), {
    withRef: true
})
