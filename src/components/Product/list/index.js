import React from 'react'
import { connect } from 'dva'
import { injectIntl } from 'react-intl'
import { Table, Pagination, Popconfirm } from 'antd'
import { Link } from 'dva/router'
import './index.styl'

class ProductList extends React.Component {
    deleteHandler = id => {
        this.props.dispatch({
            type: 'product/remove',
            payload: id
        })
    }
    pageChangeHandler = page => {
        this.props.dispatch({
            type: 'product/reload',
            payload: { page }
        })
    }

    render() {
        let {
            list: dataSource,
            loading,
            total,
            page: current,
            intl: {
                formatMessage
            }
        } = this.props

        const columns = [
            {
                title: formatMessage({ id: 'table.identifier' }),
                dataIndex: 'no',
                key: 'no',
                render: (text, record, index) => index + 1
            },
            {
                title: formatMessage({ id: 'device.productName' }),
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: formatMessage({ id: 'device.deviceCode' }),
                dataIndex: 'code',
                key: 'code'
            },
            {
                title: formatMessage({ id: 'table.productType' }),
                dataIndex: 'category.name',
                key: 'category.name'
            },
            {
                title: formatMessage({ id: 'table.productBrand' }),
                dataIndex: 'brand',
                key: 'brand'
            },
            {
                title: formatMessage({ id: 'table.productFunctionality' }),
                dataIndex: 'functions',
                key: 'functions',
                render: text => {
                    return (
                        <span className='functions' title={text ? text.join('、') : ''}>
                            {text ? text.join('、') : ''}
                        </span>
                    )
                }
            },
            {
                title: formatMessage({ id: 'table.operation' }),
                key: 'Operation',
                render: (text, record) => {
                    let url = `/product/detail/${record.id}`
                    let copyUrl = `/product/detail/${record.id}/copy`
                    return (
                        <span className='operation'>
                            {/* <Link to={url}>详情</Link> */}
                            <Link to={copyUrl}>{formatMessage({ id: 'button.copy' })}</Link>
                            <Link to={url}>{formatMessage({ id: 'button.edit' })}</Link>
                            <Popconfirm title={formatMessage({ id: 'table.confirmName' })} onConfirm={this.deleteHandler.bind(null, record.id)}>
                                <a href='' className='deleColor'>{formatMessage({ id: 'button.deleColor' })}</a>
                            </Popconfirm>
                        </span>
                    )
                }
            }
        ]

        return (
            <div className='ui-table'>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    rowKey={record => record.id}
                    pagination={false}
                />
                <Pagination
                    className='ant-table-pagination'
                    total={total}
                    current={current}
                    pageSize={10}
                    onChange={this.pageChangeHandler}
                />
            </div >
        )
    }
}

export default injectIntl(connect(({ product }) => ({ ...product }))(ProductList), {
    withRef: true
})
