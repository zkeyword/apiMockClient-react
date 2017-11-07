import React from 'react'
import { connect } from 'dva'
import { Button, Form, Input } from 'antd'
import { Link } from 'dva/router'
import { passWord } from '../../utils/auth'
import './index.styl'

const FormItem = Form.Item

const Login = ({
    login,
    dispatch,
    form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        getFieldError
    }
}) => {
    function handleSubmit(e) {
        e.preventDefault()
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            values.password = passWord(values.username, values.password)
            dispatch({ type: 'login/auth', payload: values })
        })
    }

    return (
        <div className='page-login page-resetting'>
            <div className='form'>
                <div className='title'>
                    <span>apiMockClient登录</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <FormItem hasFeedback>
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: '用户名不能为空'
                                }
                            ]
                        })(<Input size='large' onPressEnter={handleSubmit} placeholder='请输入用户名' />)}

                    </FormItem>
                    <FormItem hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '密码不能为空'
                                }
                            ]
                        })(<Input size='large' type='password' onPressEnter={handleSubmit} placeholder='请输入密码' />)}
                    </FormItem>
                    <Link to='/login/forget' className='login-forgot'> 忘记密码 </Link>
                    <Button type='primary' htmlType='submit' className='login-button'>
                        登 录
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default connect(({ login }) => ({ login }))(Form.create()(Login))
