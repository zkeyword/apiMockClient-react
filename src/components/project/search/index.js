import React from 'react'
import { Form, Input, Button, Select } from 'antd'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import { Link } from 'dva/router'

const FormItem = Form.Item
const Option = Select.Option

class ProductSearch extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'product/productsCategoryt'
        })
    }

    state = {
        expand: false
    }

    handleSearch = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values)
            }
            if (values.category === '请输入产品类型') {
                values.category = ''
            }
            this.props.dispatch({
                type: 'product/reload',
                payload: values
            })
        })
    }

    handleReset = () => {
        this.props.form.resetFields()
    }

    toggle = () => {
        const { expand } = this.state
        this.setState({ expand: !expand })
    }

    render() {
        let {
            form: {
                getFieldDecorator
            },
            intl: {
                formatMessage
            },
            product: {
                categoryData
            }
        } = this.props
        let categoryOption = []
        categoryData.forEach((item, i) => {
            categoryOption.push(<Option value={item.id} key={i}>{item.name}</Option>)
        })
        return (
            <Form className='ui-search'
                onSubmit={this.handleSearch}
            >
                <FormItem label={formatMessage({ id: 'device.productName' })} className='lable'>
                    {getFieldDecorator(`name`)(
                        <Input placeholder={formatMessage({ id: 'device.enterProductName' })} className='inputW' />
                    )}
                </FormItem>
                <FormItem label={formatMessage({ id: 'table.productType' })}>
                    {getFieldDecorator('category', {
                        initialValue: formatMessage({ id: 'table.enterProductType' })
                    })(
                        <Select>
                            {categoryOption}
                        </Select>
                        )}
                </FormItem>
                <Button type='primary' htmlType='submit' >{formatMessage({ id: 'button.lookup' })}</Button>
                <Link to='/product/detail'><Button type='primary' htmlType='submit' >{formatMessage({ id: 'button.add' })}</Button></Link>
            </Form >
        )
    }
}

export default injectIntl(connect(({ product }) => ({ product }))(Form.create()(ProductSearch)), {
    withRef: true
})
