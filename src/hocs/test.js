import React from 'react'

export default function test() {
    // if (!elm || !liWidth) {
    //     const error = { text: '高阶组件报错：centerLi(elm,liWidth),elm或liWidth 参数不存在！', componentType: 'HOC' }
    //     throw error.text
    // }
    return Comp =>
        class test extends React.Component {
            constructor(props) {
                super(props)
                console.log(this.props)
            }

            componentDidMount() {
            }

            render() {
                const props = this.props
                return <Comp {...props} />
            }
        }
}
