import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Form, Input } from 'antd'
import { Link } from 'dva/router'
import { passWord } from '../../utils/auth'
import './index.styl'

const FormItem = Form.Item
const InputGroup = Input.Group
const Forget = ({
    login,
    dispatch,
    form: {
        getFieldDecorator,
        validateFieldsAndScroll,
        getFieldValue,
        setFields
    }
}) => {
    let timer = null
    function code() {
        validateFieldsAndScroll(['username'], (errors, values) => {
            if (errors) {
                return
            }
            let i = 60
            clearInterval(timer)
            dispatch({ type: 'login/send', payload: { ...values, time: i, type: 'BOSS' } })
            timer = setInterval(() => {
                i--
                dispatch({ type: 'login/send', payload: { time: i } })
                if (i === 0) {
                    clearInterval(timer)
                }
            }, 1000)
        })
    }
    function handleOk() {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            values.password = passWord(values.username, values.password)
            dispatch({ type: 'login/reset', payload: values })
        })
    }
    return (
        <div className='page-forget page-resetting'>
            <div className='form'>
                <div className='title'>
                    <span>{name}密码重置</span>
                </div>
                <form onSubmit={handleOk}>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: '账号不能为空'
                                }
                            ]
                        })(<Input size='large' onPressEnter={handleOk} placeholder='请输入您的账号' />)}
                    </FormItem>
                    {/* <FormItem>
                        <InputGroup >
                            {getFieldDecorator('phone', {
                                rules: [
                                    {
                                        required: true,
                                        message: '电话号码/邮箱不能为空'
                                    }, {
                                        validator: (rules, value, callback) => {
                                            let phoneM = getFieldValue('phone')
                                            let post = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                                            let mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/
                                            if (!post.test(phoneM) === true && !mobile.test(phoneM)) {
                                                callback('请输入正确的电话号码/邮箱')
                                            } else {
                                                callback()
                                            }
                                        }
                                    }
                                ]
                            })(<Input size='large' placeholder='请输入您绑定的手机号码/邮箱' className='forgetW' />)}
                            <Button size='large' className='send-code' type='primary' onClick={code} disabled={login.isClick} style={{ margin: 0 }}>{login.textStatus}</Button>
                        </InputGroup >
                    </FormItem> */}
                    <FormItem>
                        <InputGroup >
                            {getFieldDecorator('smsCode', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填项'
                                    }
                                ]
                            })(<Input size='large' onPressEnter={handleOk} placeholder='请输入获取到的验证码' className='forgetW' />)}
                            <Button size='large' className='send-code' type='primary' onClick={code} disabled={login.isClick} style={{ margin: 0 }}>{login.textStatus}</Button>
                        </InputGroup >
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '密码不能为空'
                                }, {
                                    max: 12,
                                    message: '密码不许超过12个字符'
                                }, {
                                    min: 6,
                                    message: '密码至少6个字符'
                                }, {
                                    validator: (rules, value, callback) => {
                                        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(value) && value && value.length >= 6) {
                                            callback('不能全为数字和字母')
                                        } else {
                                            callback()
                                        }
                                    }
                                }
                            ]
                        })(<Input size='large' type='password' onPressEnter={handleOk} placeholder='请输入新密码' />)}
                    </FormItem>
                    <FormItem>

                        {getFieldDecorator('checkP', {
                            rules: [
                                {
                                    required: true,
                                    message: '密码不能为空'
                                }, {
                                    max: 12,
                                    message: '密码不许超过12个字符'
                                }, {
                                    min: 6,
                                    message: '用户名至少6个字符'
                                }, {
                                    validator: (rules, value, callback) => {
                                        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(value) && value && value.length >= 6) {
                                            callback('不能全为数字和字母')
                                        } else {
                                            callback()
                                        }
                                    }
                                }, {
                                    validator: (rules, value, callback) => {
                                        let newP = getFieldValue('password')
                                        let checkP = getFieldValue('checkP')
                                        if (newP !== checkP && value.length > 6) {
                                            callback('两次输入密码不一致')
                                        } else {
                                            callback()
                                        }
                                    }
                                }
                            ]
                        })(<Input size='large' type='password' onPressEnter={handleOk} placeholder='请确认新密码' />)}

                    </FormItem>
                    <FormItem>
                        <Button type='primary' className='cancel-button '>
                            <Link to='/login'>取消</Link>
                        </Button>
                        <Button type='primary' htmlType='submit' className='cancel-button '>
                            完成
                        </Button>
                    </FormItem>
                </form>
            </div>
        </div >
    )
}

Forget.propTypes = {
    form: PropTypes.object,
    login: PropTypes.object,
    dispatch: PropTypes.func
}

export default connect(({ login }) => ({ login }))(Form.create()(Forget))
