import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Form, Input } from 'antd'
import { Link } from 'dva/router'
import './index.styl'

const FormItem = Form.Item

const Resetting = ({
    resetting,
    dispatch,
    form: {
    getFieldDecorator,
        validateFieldsAndScroll,
        getFieldValue,
        validateFields
  }
}) => {
    // const { loginLoading } = login

    function handleOk() {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            dispatch({ type: 'resetting/resetting', payload: values })
        })
    }

    return (
        <div className='page-resetting'>
            <div className='form'>
                <div className='title'>
                    <span>{name}密码重置</span>
                </div>
                <form>
                    <FormItem hasFeedback>
                        {getFieldDecorator('newP', {
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
                                        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(value) && value.length >= 6) {
                                            callback('不能全为数字和字母')
                                        } else {
                                            callback()
                                        }
                                    }
                                }
                            ]
                        })(<Input size='large' onPressEnter={handleOk} placeholder='请输入新密码' />)}
                    </FormItem>
                    <FormItem hasFeedback>

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
                                        if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(value) && value.length >= 6) {
                                            callback('不能全为数字和字母')
                                        } else {
                                            callback()
                                        }
                                    }
                                }, {
                                    validator: (rules, value, callback) => {
                                        let newP = getFieldValue('newP')
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
                        <Button type='primary' htmlType='submit' className='cancel-button '>
                            取消
                        </Button>
                        <Button type='primary' htmlType='submit' className='cancel-button '>
                            <Link to='/'> 完成</Link>
                        </Button>
                    </FormItem>
                </form>
            </div>
        </div>
    )
}

Resetting.propTypes = {
    form: PropTypes.object,
    resetting: PropTypes.object,
    dispatch: PropTypes.func
}

export default connect(({ resetting }) => ({ resetting }))(Form.create()(Resetting))
