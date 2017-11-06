import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import { Form, Input, Button } from 'antd'
import { Link } from 'dva/router'

const FormItem = Form.Item

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
            values.creator = {
                name: 'admin',
                id: 'admin'
            }
            if (!this.props.id) {
                this.props.dispatch({
                    type: 'modelsBoard/create',
                    payload: values
                })
            } else {
                values.id = this.props.id
                this.props.dispatch({
                    type: 'modelsBoard/modify',
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
            form: {
            getFieldDecorator
        },
            intl: {
                formatMessage
            }
    } = this.props
        return (
            <div className='page-projectDetail'>
                <FormItem label={formatMessage({ id: 'table.projectName' })}>
                    {getFieldDecorator('content', {
                        initialValue: '',
                        rules: [{
                            required: true,
                            message: formatMessage({ id: 'table.enterProjectName' })
                        }]
                    })(
                        <Input />
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
            </div>
        )
    }
}

export default injectIntl(connect()(ProjectDetail), {
    withRef: true
})
