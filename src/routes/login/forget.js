import React from 'react'
import { connect } from 'dva'
import { Button, Form, Input } from 'antd'
import { Link } from 'dva/router'
import { injectIntl } from 'react-intl'
import { passWord } from '../../utils/auth'
import './index.styl'

const FormItem = Form.Item
const InputGroup = Input.Group
class Forget extends React.Component {
    constructor(props) {
        super(props)
        this.timer = null
    }

    code = () => {
        this.props.form.validateFieldsAndScroll(['username'], (errors, values) => {
            if (errors) {
                return
            }
            let i = 60
            clearInterval(this.timer)
            this.props.dispatch({ type: 'login/send', payload: { ...values, time: i, type: 'IOT' } })
            this.timer = setInterval(() => {
                i--
                this.props.dispatch({ type: 'login/send', payload: { time: i } })
                if (i === 0) {
                    clearInterval(this.timer)
                }
            }, 1000)
        })
    }

    handleOk = () => {
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            values.password = passWord(values.username, values.password)
            this.props.dispatch({ type: 'login/reset', payload: values })
        })
    }

    render() {
        let {
            login,
            form: {
                getFieldDecorator,
                getFieldValue
            },
            intl: {
                formatMessage
            }
        } = this.props

        return (
            <div className='page-forget page-resetting' >
                <div className='form'>
                    <div className='title'>
                        <span>{formatMessage({ id: 'login.resetTitle' })}</span>
                    </div>
                    <form onSubmit={this.handleOk}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({ id: 'login.username' })
                                    }
                                ]
                            })(<Input size='large' onPressEnter={this.handleOk} placeholder={formatMessage({ id: 'login.username' })} />)}
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
                                })(<Input size='large' onPressEnter={this.handleOk} placeholder={formatMessage({ id: 'login.code' })} className='forgetW' />)}
                                <Button size='large' className='send-code' type='primary' onClick={this.code} disabled={login.isClick} style={{ margin: 0 }}>{login.textStatus}</Button>
                            </InputGroup >
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({ id: 'login.password' })
                                    }, {
                                        max: 12,
                                        message: formatMessage({ id: 'login.passwordlength12' })
                                    }, {
                                        min: 6,
                                        message: formatMessage({ id: 'login.passwordlength6' })
                                    }, {
                                        validator: (rules, value, callback) => {
                                            if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(value) && value && value.length >= 6) {
                                                callback(formatMessage({ id: 'login.passwordRule' }))
                                            } else {
                                                callback()
                                            }
                                        }
                                    }
                                ]
                            })(<Input size='large' type='password' onPressEnter={this.handleOk} placeholder={formatMessage({ id: 'login.passwordNew' })} />)}
                        </FormItem>
                        <FormItem>

                            {getFieldDecorator('checkP', {
                                rules: [
                                    {
                                        required: true,
                                        message: formatMessage({ id: 'login.password' })
                                    }, {
                                        max: 12,
                                        message: formatMessage({ id: 'login.passwordlength12' })
                                    }, {
                                        min: 6,
                                        message: formatMessage({ id: 'login.passwordlength6' })
                                    }, {
                                        validator: (rules, value, callback) => {
                                            if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(value) && value && value.length >= 6) {
                                                callback(formatMessage({ id: 'login.passwordRule' }))
                                            } else {
                                                callback()
                                            }
                                        }
                                    }, {
                                        validator: (rules, value, callback) => {
                                            let newP = getFieldValue('password')
                                            let checkP = getFieldValue('checkP')
                                            if (newP !== checkP && value.length > 5) {
                                                callback(formatMessage({ id: 'login.consistency' }))
                                            } else {
                                                callback()
                                            }
                                        }
                                    }
                                ]
                            })(<Input size='large' type='password' onPressEnter={this.handleOk} placeholder={formatMessage({ id: 'login.passwordConfirm' })} />)}

                        </FormItem>
                        <FormItem>
                            <Button type='primary' className='cancel-button '>
                                <Link to='/login'>{formatMessage({ id: 'login.cancel' })}</Link>
                            </Button>
                            <Button type='primary' htmlType='submit' className='cancel-button '>
                                {formatMessage({ id: 'login.accomplish' })}
                            </Button>
                        </FormItem>
                    </form>
                </div>
            </div >
        )
    }
}

export default injectIntl(connect(({ login }) => ({ login }))(Form.create()(Forget)), {
    withRef: true
})
