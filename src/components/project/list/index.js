import React from 'react'
import { connect } from 'dva'
import { Button, Icon, Popconfirm } from 'antd'
import { Link } from 'dva/router'
import { injectIntl } from 'react-intl'
import './index.styl'
import test from '../../../hocs/test'

class projectList extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch({
            type: 'interfaces/reset'
        })
    }

    deleteHandler = id => {
        let userId = id
        this.props.dispatch({
            type: 'project/remove',
            payload: { id, userId }
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
                list: dataSource
            },
            intl: {
                formatMessage
            }
        } = this.props
        return (
            <div className='page-project'>
                <Link to='/project/detail'><Button type='primary' className='addButton' >{formatMessage({ id: 'button.add' })}</Button></Link>
                <div className='ui-tableList'>
                    {
                        dataSource.map((items, i) => {
                            return (
                                <div key={i} className='item' title={items.name}>
                                    <div className='item-ico'>
                                        <Popconfirm title={formatMessage({ id: 'table.confirmName' })} onConfirm={this.deleteHandler.bind(null, items.id)}>
                                            <Icon type='delete' />
                                        </Popconfirm>
                                        <Link to={`/project/detail/${items.id}`}><Icon type='edit' /></Link>
                                    </div>
                                    <div className='item-name'>
                                        <Link to={`/interfaces/${items.id}`}><p className='item-interface'>{items.name}</p></Link>
                                    </div>
                                    <div className='item-description'>
                                        <p className='item-description-size'>{items.description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default injectIntl(connect(({ project }) => ({ project }))(test()(projectList)), {
    withRef: true
})
