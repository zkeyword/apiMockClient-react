import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import { Form, Input, Button, Popconfirm, Select, Icon } from 'antd'
import { Link } from 'dva/router'
import './index.styl'
import Model from './model'
const FormItem = Form.Item
const Option = Select.Option

class DeviceDetail extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'product/reset'
        })
        this.props.dispatch({
            type: 'product/productsCategoryt'
        })
        if (this.props.id) {
            this.props.dispatch({
                type: 'product/fetch',
                payload: { id: this.props.id }
            })
        }
    }

    state = {
        visible: false,
        item: null,
        type: null,
        specification: [],
        properties: [],
        index: undefined
    }

    showModal = (item, type, index) => {
        let { data } = this.props.product
        if (this.props.id) {
            this.setState({
                visible: true,
                item,
                type,
                index,
                specification: data.specification ? data.specification : [],
                properties: data.properties ? data.properties : []
            })
        } else {
            this.setState({
                visible: true,
                item,
                type,
                index
            })
        }
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        })
    }

    setItems = (value, itemName) => {
        let { data } = this.props.product
        let { specification, properties } = this.state
        let handle = () => {
            let { item, type, index } = this.state
            if (typeof value !== 'object') return this.state[item].splice(value, 1)
            if (type === 'add') return this.state[item].push(value)
            this.state[item][index] = value
        }
        new Promise((resolve, reject) => {
            this.setState({
                item: itemName
            }, () => {
                console.log(itemName)
                resolve(itemName)
            })
            if (this.props.id) {
                if (itemName === 'specification') {
                    if (specification.length === 0) {
                        this.setState({
                            specification: data.specification
                        }, () => {
                            resolve()
                        })
                    }
                } else {
                    if (properties.length === 0) {
                        this.setState({
                            properties: data.properties
                        }, () => {
                            resolve()
                        })
                    }
                }
            }
        }).then(() => {
            handle()
            this.setState({
                properties,
                specification,
                visible: false
            })
        })
    }

    handleOk = (validateFields, resetFields) => {
        validateFields((err, values) => {
            if (err) {
                return console.log('Received values of form: ', values)
            }
            console.log()
            this.setItems(values, this.state.item)
            resetFields()
        })
    }

    saveFormRef = form => {
        this.form = form
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { validateFields } = this.props.form
        validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values)
            }
            // TODO
            let empty = true
            if (values.specification) {
                values.specification.forEach(item => {
                    if (item.value === '') {
                        if (item.required === 0) {
                            empty = false
                        }
                    }
                })
            }
            values.category = {
                id: values.category
            }
            if (this.props.id && !this.props.copy) {
                if (values.name && values.code && values.brand && values.modelNumber && empty) {
                    values.id = this.props.id
                    this.props.dispatch({
                        type: 'product/modify',
                        payload: values
                    })
                }
            } else {
                if (values.name && values.code && values.brand && values.modelNumber && empty) {
                    this.props.dispatch({
                        type: 'product/create',
                        payload: values
                    })
                }
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        let { data, categoryData } = this.props.product
        console.log(this.state)
        let {
            intl: {
            formatMessage
            }
        } = this.props
        // let isDisabled = Boolean(this.props.id)
        let isDisabled = false

        let categoryOption = []
        categoryData.forEach((item, i) => {
            categoryOption.push(<Option value={item.id} key={i}>{item.name}</Option>)
        })

        let specificationJsx = []
        let specificationItems = this.state.specification.length ? this.state.specification : data.specification
        specificationItems && specificationItems.forEach((item, i) => {
            specificationJsx.push(
                <div className='inputWrap' key={i}>
                    <FormItem label={`${item.name}`} className='input-name'>
                        {
                            getFieldDecorator(`specification[${i}].value`, {
                                rules: [{
                                    required: item.required === 0,
                                    message: `${formatMessage({ id: 'table.enter' })}${item.name}`
                                }],
                                initialValue: item.value
                            })(
                                <Input disabled={isDisabled || item.required === 2} />
                                )
                        }
                    </FormItem>
                    <FormItem style={{ display: 'none' }} >
                        {getFieldDecorator(`specification[${i}].name`, {
                            initialValue: item.name
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <FormItem style={{ display: 'none' }} >
                        {getFieldDecorator(`specification[${i}].required`, {
                            initialValue: item.required
                        })(
                            <Input />
                            )}
                    </FormItem>
                    <div className='btnWrap'>
                        <Icon type='edit' onClick={this.showModal.bind(this, 'specification', 'edit', i)} title={formatMessage({ id: 'button.edit' })} />
                        <Popconfirm title={formatMessage({ id: 'table.specification' })} onConfirm={this.setItems.bind(this, i, 'specification')}>
                            <Icon type='delete' title={formatMessage({ id: 'button.deleColor' })} />
                        </Popconfirm>
                    </div>
                </div>
            )
        })
        let propertiesJsx = []
        let propertiesItems = this.state.properties.length ? this.state.properties : data.properties
        propertiesItems && propertiesItems.forEach((item, i) => {
            let propertiesTypeName
            switch (item.propertiesType) {
                case '0':
                    propertiesTypeName = formatMessage({ id: 'table.read-only' })
                    break
                case '1':
                    propertiesTypeName = formatMessage({ id: 'table.canWrite' })
                    break
                case '2':
                    propertiesTypeName = formatMessage({ id: 'table.alert' })
                    break
                case '3':
                    propertiesTypeName = formatMessage({ id: 'table.fault' })
                    break
            }
            let propertiesDataTypeName
            switch (item.propertiesDataType) {
                case '0':
                    propertiesDataTypeName = formatMessage({ id: 'table.Boolean' })
                    break
                case '1':
                    propertiesDataTypeName = formatMessage({ id: 'table.enumerate' })
                    break
                case '2':
                    propertiesDataTypeName = formatMessage({ id: 'table.numerical' })
                    break
                case '3':
                    propertiesDataTypeName = formatMessage({ id: 'table.extend' })
                    break
            }
            propertiesJsx.push(
                <div className='dataDot' key={i}>
                    <div className='inputWrap'>
                        <FormItem label={formatMessage({ id: 'table.displayName' })}>
                            {getFieldDecorator(`properties[${i}].propertiesName`, {
                                initialValue: item.propertiesName
                            })(
                                <span>{item.propertiesName}</span>
                                )}
                        </FormItem>
                        <FormItem label={formatMessage({ id: 'table.IdentificationName' })}>
                            {getFieldDecorator(`properties[${i}].propertiesCode`, {
                                initialValue: item.propertiesCode
                            })(
                                <span>{item.propertiesCode}</span>
                                )}
                        </FormItem>
                        <FormItem label={formatMessage({ id: 'table.read-writeType' })}>
                            {getFieldDecorator(`properties[${i}].propertiesType`, {
                                initialValue: item.propertiesType
                            })(
                                <span>{propertiesTypeName}</span>
                                )}
                        </FormItem>
                        <FormItem label={formatMessage({ id: 'device.dataType' })}>
                            {getFieldDecorator(`properties[${i}].propertiesDataType`, {
                                initialValue: item.propertiesDataType
                            })(
                                <span>{propertiesDataTypeName}</span>
                                )}
                        </FormItem>
                        {
                            item.propertiesDataType === '1' && (
                                <FormItem label={formatMessage({ id: 'table.enumerateRange' })}>
                                    {getFieldDecorator(`properties[${i}].propertiesEun`, {
                                        initialValue: item.propertiesEun
                                    })(
                                        <span>{item.propertiesEun}</span>
                                        )}
                                </FormItem>
                            )
                        }
                        {
                            item.propertiesDataType === '2' && (
                                <FormItem label={formatMessage({ id: 'table.numericalRange' })}>
                                    {getFieldDecorator(`properties[${i}].propertiesNum`, {
                                        initialValue: item.propertiesNum
                                    })(
                                        <span>{item.propertiesNum}</span>
                                        )}
                                </FormItem>
                            )
                        }
                        {
                            item.propertiesDataType === '2' && (
                                <FormItem label={formatMessage({ id: 'table.resolution' })}>
                                    {getFieldDecorator(`properties[${i}].propertiesScreen`, {
                                        initialValue: item.propertiesScreen
                                    })(
                                        <span>{item.propertiesScreen}</span>
                                        )}
                                </FormItem>
                            )
                        }
                        {
                            item.propertiesDataType === '3' && (
                                <FormItem label={formatMessage({ id: 'table.dataLength' })}>
                                    {getFieldDecorator(`properties[${i}].propertiesLen`, {
                                        initialValue: item.propertiesLen
                                    })(
                                        <span>{item.propertiesLen}</span>
                                        )}
                                </FormItem>
                            )
                        }
                        <FormItem label={formatMessage({ id: 'device.remarks' })}>
                            {getFieldDecorator(`properties[${i}].propertiesRemark`, {
                                initialValue: item.propertiesRemark
                            })(
                                <span>{item.propertiesRemark}</span>
                                )}
                        </FormItem>
                    </div>
                    <div className='btnWrap'>
                        <Icon type='edit' onClick={this.showModal.bind(this, 'properties', 'edit', i)} title={formatMessage({ id: 'button.edit' })} />
                        <Popconfirm title={formatMessage({ id: 'table.deleteData' })} onConfirm={this.setItems.bind(this, i, 'properties')}>
                            <Icon type='delete' title={formatMessage({ id: 'button.deleColor' })} />
                        </Popconfirm>
                    </div>
                </div>
            )
        })

        return (
            <div className='detail' >
                <Form
                    onSubmit={this.handleSubmit}
                >
                    <div className='datial_content'>
                        <p className='title fn-clear'>
                            <span className='name'>{formatMessage({ id: 'product.basicInformation' })}</span>
                        </p>
                        <div className='productInfo'>
                            <FormItem label={formatMessage({ id: 'device.productName' })} className='input-name'>
                                {getFieldDecorator(`name`, {
                                    rules: [{
                                        required: true,
                                        message: formatMessage({ id: 'device.enterProductName' })
                                    }],
                                    initialValue: data.name
                                })(
                                    <Input className='inputW' disabled={isDisabled} />
                                    )}
                            </FormItem>
                            <FormItem label={formatMessage({ id: 'table.productType' })}>
                                {getFieldDecorator('category', {
                                    rules: [{
                                        required: true,
                                        message: formatMessage({ id: 'table.enterProductType' })
                                    }],
                                    initialValue: data.category ? data.category.id : (categoryData.length ? categoryData[0].id : '')
                                })(
                                    <Select>
                                        {categoryOption}
                                    </Select>
                                    )}
                            </FormItem>
                            <FormItem label={formatMessage({ id: 'device.deviceCode' })} className='input-name ' >
                                {getFieldDecorator(`code`, {
                                    rules: [{
                                        required: true,
                                        message: formatMessage({ id: 'device.enterDeviceCode' })
                                    }],
                                    initialValue: data ? data.code : ''
                                })(
                                    <Input className='inputW' disabled={isDisabled} />
                                    )}
                            </FormItem>
                            <FormItem label={formatMessage({ id: 'table.productBrand' })} className='input-name'>
                                {getFieldDecorator(`brand`, {
                                    rules: [{
                                        required: true,
                                        message: formatMessage({ id: 'table.enterProductBrand' })
                                    }],
                                    initialValue: data.brand ? data.brand : ''
                                })(
                                    <Input className='inputW' disabled={isDisabled} />
                                    )}
                            </FormItem>
                            <FormItem label={formatMessage({ id: 'table.productModel' })} className='input-name'>
                                {getFieldDecorator(`modelNumber`, {
                                    rules: [{
                                        required: true,
                                        message: formatMessage({ id: 'table.enterProductModel' })
                                    }],
                                    initialValue: data.modelNumber
                                })(
                                    <Input className='inputW' disabled={isDisabled} />
                                    )}
                            </FormItem>
                        </div>
                    </div>
                    <div className='datial_content'>
                        <p className='title fn-clear'>
                            <span className='name'>{formatMessage({ id: 'product.specificationsInformation' })}</span>
                            <Button icon='plus' onClick={this.showModal.bind(this, 'specification', 'add')}>{formatMessage({ id: 'product.productSpecification' })}</Button>
                        </p>
                        <div className='search-top'>
                            {
                                specificationJsx
                            }
                            {
                                (!specificationItems || !specificationItems.length) && (
                                    <div className='nullText'><i className='anticon anticon-frown-o' />{formatMessage({ id: 'product.noProductParameters' })}<span onClick={this.showModal.bind(this, 'specification', 'add', undefined)}>{formatMessage({ id: 'product.clickAdd' })}</span></div>
                                )
                            }
                        </div>
                    </div>
                    <div className='datial_content'>
                        <p className='title fn-clear'>
                            <span className='name'>{formatMessage({ id: 'product.dataPoints' })}</span>
                            <Button icon='plus' onClick={this.showModal.bind(this, 'properties', 'add')}>{formatMessage({ id: 'product.dataPoints' })}</Button>
                        </p>
                        {
                            propertiesJsx
                        }
                        {
                            (!propertiesItems || !propertiesItems.length) && (
                                <div className='nullText'><i className='anticon anticon-frown-o' />{formatMessage({ id: 'product.noDataPoints' })}<span onClick={this.showModal.bind(this, 'properties', 'add', undefined)}>{formatMessage({ id: 'product.clickAdd' })}</span></div>
                            )
                        }
                    </div>
                    <div className='back'>
                        <Button type='primary' htmlType='submit'>{formatMessage({ id: 'button.save' })}</Button>
                        <Button><Link to='/product'>{formatMessage({ id: 'button.returned' })}</Link></Button>
                    </div>
                </Form>
                <Model
                    state={this.state}
                    handleCancel={this.handleCancel}
                    handleOk={this.handleOk}
                    ref={this.saveFormRef}
                />
            </div>
        )
    }
}

export default injectIntl(connect(({ product }) => ({ product }))(Form.create()(DeviceDetail)), {
    withRef: true
})
