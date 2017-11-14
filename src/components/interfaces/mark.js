
function execCommand(data) {
    let editor = this.refs.editor.getCodeMirror()
    let obj = {
        mock: {
            'String': '"string|1-10": "★"',
            'Number': '"number|1-100": 100',
            'Boolean': '"boolean|1-2": true',
            'Object': `
            "object|2": {
                "310000": "上海市",
                "320000": "江苏省",
                "330000": "浙江省",
                "340000": "安徽省"
            }
            `,
            'Array': `
            "array|1-10": [
                {
                    "name|+1": [
                    "Hello",
                    "Mock.js",
                    "!"
                    ]
                }
            ]
            `,
            'Date': '@date("yyyy-MM-dd")',
            'Image': '@image("200x100")'
        },
        api: {
            'GET': `
                    ##  添加项目 [POST /v0.1/api/project]

                    + Request (application/json)

                            {
                                "name": "boss系统", // 项目名
                                "alias": "boss", // 项目别名
                                "description": "apiMock", // 描述
                                "userId": "0" // 用户id
                            }

                    + Response 200

                            {
                                "id": 3,
                                "name": "boss系统",
                                "alias": "boss",
                                "description": "apiMock",
                                "updatedAt": "2017-10-29T02:17:12.553Z",
                                "createdAt": "2017-10-29T02:17:12.553Z"
                            }                
                                    `,
            'POST': `
                        ##  添加项目 [POST /v0.1/api/project]

                        + Request (application/json)

                                {
                                    "name": "boss系统", // 项目名
                                    "alias": "boss", // 项目别名
                                    "description": "apiMock", // 描述
                                    "userId": "0" // 用户id
                                }

                        + Response 200

                                {
                                    "id": 3,
                                    "name": "boss系统",
                                    "alias": "boss",
                                    "description": "apiMock",
                                    "updatedAt": "2017-10-29T02:17:12.553Z",
                                    "createdAt": "2017-10-29T02:17:12.553Z"
                                }               
                                        `,
            'DELETE': `
                        ##  添加项目 [POST /v0.1/api/project]

                        + Request (application/json)

                                {
                                    "name": "boss系统", // 项目名
                                    "alias": "boss", // 项目别名
                                    "description": "apiMock", // 描述
                                    "userId": "0" // 用户id
                                }

                        + Response 200

                                {
                                    "id": 3,
                                    "name": "boss系统",
                                    "alias": "boss",
                                    "description": "apiMock",
                                    "updatedAt": "2017-10-29T02:17:12.553Z",
                                    "createdAt": "2017-10-29T02:17:12.553Z"
                                }               
                                        `,
            'PUT': `
                    ##  添加项目 [POST /v0.1/api/project]

                    + Request (application/json)

                            {
                                "name": "boss系统", // 项目名
                                "alias": "boss", // 项目别名
                                "description": "apiMock", // 描述
                                "userId": "0" // 用户id
                            }

                    + Response 200

                            {
                                "id": 3,
                                "name": "boss系统",
                                "alias": "boss",
                                "description": "apiMock",
                                "updatedAt": "2017-10-29T02:17:12.553Z",
                                "createdAt": "2017-10-29T02:17:12.553Z"
                            }               
                                    `,
            'PATCH': `
                        ##  添加项目 [POST /v0.1/api/project]

                        + Request (application/json)

                                {
                                    "name": "boss系统", // 项目名
                                    "alias": "boss", // 项目别名
                                    "description": "apiMock", // 描述
                                    "userId": "0" // 用户id
                                }

                        + Response 200

                                {
                                    "id": 3,
                                    "name": "boss系统",
                                    "alias": "boss",
                                    "description": "apiMock",
                                    "updatedAt": "2017-10-29T02:17:12.553Z",
                                    "createdAt": "2017-10-29T02:17:12.553Z"
                                } 
                                        `
        }
    }
    this.insertString(editor, obj[data.type][data.value])
}
export default { execCommand }
