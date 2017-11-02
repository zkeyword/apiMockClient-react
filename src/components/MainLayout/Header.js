import React from 'react'
import { Menu, Form, Select } from 'antd'
import { injectIntl } from 'react-intl'
import { Link } from 'dva/router'
import language from '../../utils/language'
import storage from '../../utils/storage'

const SubMenu = Menu.SubMenu
const Option = Select.Option

class Header extends React.Component {
    current() {
        let arr = location.pathname.split('/')
        let cur
        if (arr[1]) {
            if (arr[1] === 'system') {
                if (arr.length === 3) {
                    cur = location.pathname
                } else {
                    cur = `/${arr[1]}/${arr[2]}`
                }
            } else {
                cur = arr[1]
            }
        } else {
            cur = 'home'
        }
        return [cur]
    }

    handleSelectChange = language => {
        storage.set('language', language, 10 * 365 * 24 * 60 * 60)
        window.location.reload()
    }

    render() {
        let { formatMessage } = this.props.intl
        const { getFieldDecorator } = this.props.form
        return (
            <div className='lt-header' >
                <Link className='logo' to='/product' title='BOSS系统' />
                <Menu
                    className='nav'
                    selectedKeys={this.current(0)}
                    mode='horizontal'
                >
                    <SubMenu title={<span>{formatMessage({ id: 'nav.device' })}</span>}>
                        <Menu.Item key='product'>
                            <Link to='/product'>{formatMessage({ id: 'nav.product' })}</Link>
                        </Menu.Item>
                        <Menu.Item key='productCategory'>
                            <Link to='/productCategory'>{formatMessage({ id: 'nav.productCategory' })}</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
                <div className='operating'>
                    <span>
                        {formatMessage({ id: 'operating.welcome' })}，admin | <Link to='/login'>{formatMessage({ id: 'operating.logout' })}</Link>
                    </span>
                    {getFieldDecorator('language', {
                        initialValue: language
                    })(
                        <Select
                            onChange={this.handleSelectChange}
                        >
                            <Option value='zh-CN'>中文</Option>
                            <Option value='en-US'>English</Option>
                        </Select>
                        )}
                </div>
            </div >
        )
    }
}

export default injectIntl(Form.create()(Header), {
    withRef: true
})
