import React from 'react'
// import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import { Form, Input, Modal, Radio, Select } from 'antd'
import './index.styl'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option

class DeviceDetailModel extends React.Component {
    constructor(props) {
        super(props)
        if (this.props.id) {
            this.props.dispatch({
                type: 'device/fetch',
                payload: { id: this.props.id }
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.state })
    }

    state = {
        visible: false,
        item: null,
        type: null
    }

    handleSelect = (dataType) => {
    }

    render() {
        const { getFieldDecorator, getFieldValue, validateFields, resetFields } = this.props.form
        let { specification, properties, index, type, item } = this.state
        let {
            intl: {
            formatMessage
            }
        } = this.props
        let title = ''
        if (item === 'specification') {
            if (type === 'add') {
                title = formatMessage({ id: 'button.append' })
            } else {
                title = formatMessage({ id: 'button.edit' }) + formatMessage({ id: 'product.productParameters' })
            }
        } else {
            if (type === 'add') {
                title = formatMessage({ id: 'button.append' })
            } else {
                title = formatMessage({ id: 'button.edit' }) + formatMessage({ id: 'product.dataPoint' })
            }
        }
        // item === 'specification' ? (type === 'add' ? formatMessage({ id: 'button.append' }) : formatMessage({ id: 'button.edit' })) +
        //     formatMessage({ id: 'product.productParameters' }) : (type === 'add' ? formatMessage({ id: 'button.append' }) : formatMessage({ id: 'button.edit' })) + '数据点'

        return (
            <Modal
                title={title}
                visible={this.state.visible}
                onOk={this.props.handleOk.bind(this, validateFields, resetFields)}
                onCancel={this.props.handleCancel}
            >
                {
                    this.state.item === 'specification' && (
                        <Form>
                            <FormItem label={formatMessage({ id: 'product.fieldName' })} className='input-name'>
                                {getFieldDecorator(`name`, {
                                    rules: [{
                                        required: true,
                                        message: formatMessage({ id: 'product.enterFieldName' })
                                    }],
                                    initialValue: specification[index] ? specification[index].name : ''
                                })(
                                    <Input placeholder={formatMessage({ id: 'product.enterFieldName' })} />
                                    )}
                            </FormItem>
                            <FormItem label={formatMessage({ id: 'product.required' })} className='input-name'>
                                {getFieldDecorator('required', {
                                    rules: [{
                                        required: true,
                                        message: formatMessage({ id: 'product.enterRequired' })
                                    }],
                                    initialValue: specification[index] ? specification[index].required : 0
                                })(
                                    <RadioGroup>
                                        <Radio value={0}>{formatMessage({ id: 'product.must' })}</Radio>
                                        <Radio value={1}>{formatMessage({ id: 'product.optional' })}</Radio>
                                        <Radio value={2}>{formatMessage({ id: 'power.stopped' })}</Radio>
                                    </RadioGroup>
                                    )}
                            </FormItem>
                            <FormItem style={{ display: 'none' }} >
                                {getFieldDecorator(`value`, {
                                    initialValue: specification[index] ? specification[index].value : ''
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                        </Form>
                    )
                }
                {
                    this.state.item === 'properties' && (
                        <Form>
                            <FormItem label={formatMessage({ id: 'table.displayName' })} className='input-name'>
                                {getFieldDecorator(`propertiesName`, {
                                    rules: [{
                                        required: true,
                                        message: formatMessage({ id: 'table.enterDisplayName' })
                                    }],
                                    initialValue: properties[index] ? properties[index].propertiesName : ''
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                            <FormItem label={formatMessage({ id: 'table.IdentificationName' })} className='input-name'>
                                {getFieldDecorator(`propertiesCode`, {
                                    rules: [{
                                        required: true,
                                        message: formatMessage({ id: 'table.enterIdentificationName' })
                                    }],
                                    initialValue: properties[index] ? properties[index].propertiesCode : ''
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                            <FormItem label={formatMessage({ id: 'table.read-writeType' })} className='input-name'>
                                {getFieldDecorator('propertiesType', {
                                    rules: [{
                                        required: true,
                                        message: formatMessage({ id: 'table.enterRead-writeType' })
                                    }],
                                    initialValue: properties[index] ? properties[index].propertiesType : '0'
                                })(
                                    <Select>
                                        <Option value='0'>{formatMessage({ id: 'table.read-only' })}</Option>
                                        <Option value='1'>{formatMessage({ id: 'table.canWrite' })}</Option>
                                        <Option value='2'>{formatMessage({ id: 'table.alert' })}</Option>
                                        <Option value='3'>{formatMessage({ id: 'table.fault' })}</Option>
                                    </Select>
                                    )}
                            </FormItem>
                            <FormItem label={formatMessage({ id: 'device.dataType' })} className='input-name'>
                                {getFieldDecorator('propertiesDataType', {
                                    rules: [{
                                        required: true,
                                        message: formatMessage({ id: 'device.enterDataType' })
                                    }],
                                    initialValue: properties[index] ? properties[index].propertiesDataType : '0'
                                })(
                                    <Select onChange={this.handleSelect}>
                                        <Option value='0'>{formatMessage({ id: 'table.Boolean' })}</Option>
                                        <Option value='1'>{formatMessage({ id: 'table.enumerate' })}</Option>
                                        <Option value='2'>{formatMessage({ id: 'table.numerical' })}</Option>
                                        <Option value='3'>{formatMessage({ id: 'table.extend' })}</Option>
                                    </Select>
                                    )}
                            </FormItem>
                            {
                                getFieldValue('propertiesDataType') === '1' && (
                                    <FormItem label={formatMessage({ id: 'table.enumerateRange' })} className='input-name'>
                                        {getFieldDecorator(`propertiesEun`, {
                                            rules: [{
                                                required: true,
                                                message: formatMessage({ id: 'table.enterEnumerateRange' })
                                            }],
                                            initialValue: properties[index] ? properties[index].propertiesEun : ''
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                )
                            }
                            {
                                getFieldValue('propertiesDataType') === '2' && (
                                    <div>
                                        <FormItem label={formatMessage({ id: 'table.numericalRange' })} className='input-name'>
                                            {getFieldDecorator(`propertiesNum`, {
                                                rules: [{
                                                    required: true,
                                                    message: formatMessage({ id: 'table.enterNumericalRange' })
                                                }],
                                                initialValue: properties[index] ? properties[index].propertiesNum : ''
                                            })(
                                                <div>
                                                    <Input />
                                                </div>
                                                )}
                                        </FormItem>
                                        <FormItem label={formatMessage({ id: 'table.resolution' })} className='input-name'>
                                            {getFieldDecorator(`propertiesScreen`, {
                                                rules: [{
                                                    required: true,
                                                    message: formatMessage({ id: 'table.enterResolution' })
                                                }],
                                                initialValue: properties[index] ? properties[index].propertiesScreen : ''
                                            })(
                                                <div>
                                                    <Input />
                                                </div>
                                                )}
                                        </FormItem>
                                    </div>
                                )
                            }
                            {
                                getFieldValue('propertiesDataType') === '3' && (
                                    <FormItem label={formatMessage({ id: 'table.dataLength' })} className='input-name'>
                                        {getFieldDecorator(`propertiesLen`, {
                                            rules: [{
                                                required: true,
                                                message: formatMessage({ id: 'table.enterDataLength' })
                                            }],
                                            initialValue: properties[index] ? properties[index].len : ''
                                        })(
                                            <Input />
                                            )}
                                    </FormItem>
                                )
                            }
                            <FormItem label={formatMessage({ id: 'device.remarks' })} className='input-name'>
                                {getFieldDecorator(`propertiesRemark`, {
                                    initialValue: properties[index] ? properties[index].propertiesRemark : ''
                                })(
                                    <Input />
                                    )}
                            </FormItem>
                        </Form>
                    )
                }
            </Modal>
        )
    }
}

export default injectIntl(Form.create()(DeviceDetailModel), {
    withRef: true
})
