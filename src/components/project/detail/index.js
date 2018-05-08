import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import { Form, Input, Button } from 'antd'
import { Link } from 'dva/router'
import './index.styl'

const FormItem = Form.Item
const TextArea = Input.TextArea

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'project/reset'
        })
        if (this.props.id) {
            this.props.dispatch({
                type: 'project/fetch',
                payload: this.props.id
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { validateFields } = this.props.form
        validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values)
            }
            // TODO
            values.userId = this.props.id ? this.props.id : 1
            if (!this.props.id) {
                this.props.dispatch({
                    type: 'project/create',
                    payload: values
                })
            } else {
                values.id = this.props.id
                this.props.dispatch({
                    type: 'project/modify',
                    payload: values
                })
            }
        })
    }

    handleReset = () => {
        this.props.form.resetFields()
    }

    render() {
        let {
            project: {
                list
            },
            form: {
                getFieldDecorator
            },
            intl: {
                formatMessage
            }
        } = this.props
        return (
            <div className='page-projectDetail'>
                <Form onSubmit={this.handleSubmit} className='ui-formDetail'>
                    <FormItem label={formatMessage({ id: 'table.projectName' })}>
                        {getFieldDecorator('name', {
                            initialValue: list.name !== '' ? list.name : '',
                            rules: [{
                                required: true,
                                message: formatMessage({ id: 'table.enterProjectName' })
                            }]
                        })(
                            <Input placeholder={formatMessage({ id: 'table.enterProjectName' })} />
                        )}
                    </FormItem>
                    <FormItem label={formatMessage({ id: 'table.alias' })}>
                        {getFieldDecorator('alias', {
                            initialValue: list.alias !== '' ? list.alias : '',
                            rules: [{
                                required: true,
                                message: formatMessage({ id: 'table.enterAlias' })
                            }]
                        })(
                            <Input placeholder={formatMessage({ id: 'table.enterAlias' })} />
                        )}
                    </FormItem>
                    <FormItem label={formatMessage({ id: 'table.description' })} className='textArea'>
                        {getFieldDecorator('description', {
                            initialValue: list.description !== '' ? list.description : '',
                            rules: [{
                                required: false,
                                message: formatMessage({ id: 'table.enterDescription' })
                            }]
                        })(
                            <TextArea autosize={{ minRows: 4, maxRows: 6 }} placeholder={formatMessage({ id: 'table.enterDescription' })} />
                        )}
                    </FormItem>
                    <FormItem className='ui-btnBar'>
                        <Button type='primary' htmlType='submit'>
                            {formatMessage({ id: 'button.submit' })}
                        </Button>
                        <Button type='primary' onClick={this.handleReset} className='reset-form'>
                            {formatMessage({ id: 'button.reset' })}
                        </Button>
                        <Button type='primary' className='cancel-add'>
                            <Link to='/modelsBoard'>
                                {formatMessage({ id: 'button.cancel' })}
                            </Link>
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default injectIntl(connect(({ project }) => ({ project }))(Form.create()(ProjectDetail)), {
    withRef: true
})
