import React from 'react'
import { connect } from 'dva'
import MainLayout from '../../components/MainLayout/MainLayout'
import './index.styl'

function Home({ location, dispatch }) {
    dispatch({ type: 'home/jump' })
    return (
        <MainLayout location={location}>
            <div className='page-home'>
                首页
            </div>
        </MainLayout>
    )
}

export default connect(({ home }) => ({ home }))(Home)
