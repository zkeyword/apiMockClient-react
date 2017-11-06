import React from 'react'
import { connect } from 'dva'
import { Button, Table, Pagination, Popconfirm } from 'antd'
import { Link } from 'dva/router'
import { injectIntl } from 'react-intl'
import moment from 'moment'
import './index.styl'

class projectList extends React.Component {
    deleteHandler = id => {
        this.props.dispatch({
            type: 'project/remove',
            payload: id
        })
    }

    pageChangeHandler = page => {
        this.props.dispatch({
            type: 'project/reload',
            payload: { page }
        })
    }

    render() {
        let {
            project: {
            list: dataSource,
            loading,
            total,
            page: current
            },
            intl: {
                formatMessage
            }
        } = this.props

        let columns = [
            {
                title: formatMessage({ id: 'table.identifier' }),
                dataIndex: 'no',
                key: 'no',
                render: (text, record, index) => index + 1
            },
            {
                title: formatMessage({ id: 'table.projectName' }),
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: formatMessage({ id: 'table.alias' }),
                dataIndex: 'alias',
                key: 'alias'
            },
            {
                title: formatMessage({ id: 'table.description' }),
                dataIndex: 'description',
                key: 'description'
            },
            {
                title: formatMessage({ id: 'table.createdAt' }),
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: text => moment(text).utc().format('YYYY-MM-DD')
            },
            {
                title: formatMessage({ id: 'table.operation' }),
                key: 'Operation',
                render: (text, record) => {
                    let url = `/product/detail/${record.id}`
                    let interfaceUrl = `/interface/${record.id}`
                    return (
                        <span className='operation'>
                            <Link to={url}>{formatMessage({ id: 'button.edit' })}</Link>
                            <Link to={interfaceUrl}>{formatMessage({ id: 'table.interfaceList' })}</Link>
                            <Popconfirm title={formatMessage({ id: 'table.confirmName' })} onConfirm={this.deleteHandler.bind(null, record.id)}>
                                <a href='' className='deleColor'>{formatMessage({ id: 'button.deleColor' })}</a>
                            </Popconfirm>
                        </span>
                    )
                }
            }
        ]

        return (
            <div className='page-project'>
                <Link to='/project/detail'><Button type='primary' className='addButton' >{formatMessage({ id: 'button.add' })}</Button></Link>
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
            </div>
        )
    }
}

export default injectIntl(connect(({ project }) => ({ project }))(projectList), {
    withRef: true
})
