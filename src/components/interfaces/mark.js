function insertString(editor, str) {
    var selection = editor.getSelection()
    var doc = editor.getDoc()
    if (selection.length > 0) {
        editor.replaceSelection(str)
    } else {
        var cursor = doc.getCursor()

        var pos = {
            line: cursor.line,
            ch: cursor.ch
        }

        doc.replaceRange(str, pos)
    }
    doc.cm.focus()
}

function execCommand(data, template) {
    let editor = this.codeMirror.editor
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
                    "Mock.js"
                    ]
                }
            ]
            `,
            'Date': '@date("yyyy-MM-dd")',
            'Image': '@image("200x100")'
        },
        api: {
            'GET': `
## 获得平面图列表 [GET /xx/xxx/xxx{?page}{?size}{?org_id}{?app_id}]

获得平面图列表（列表结构）

+ Parameters

    + page (number, optional) - 当前页数
        + Default: 0
    + size (number,optional) - 每页大小
        + Default: 20
    + org_id (string,optional) - 组织ID
    + app_id (string,optional) - 应用ID

+ Request

    + Headers

        Authorization: MAC id="",nonce="",mac=""

+ Response 200 (application/json)

    ${template.response ? template.response : `
    {

    }
    `}
`,
            'POST': `
##  添加项目 [POST /xx/xxx]

+ Request (application/json)

    + Headers

        Authorization: MAC id="",nonce="",mac=""

    + Body

        ${template.request ? template.request : `
        {

        }
        `}

+ Response 200

    ${template.response ? template.response : `
    {

    }
    `}              
`,
            'DELETE': `
##  添加项目 [DELETE /xx/xx/{id}]

+ Parameters

    + id (string) - 建筑的ID
  
+ Request (application/json)

    + Headers

        Authorization: MAC id="",nonce="",mac=""

 + Response 200 (application/json)      
`,
            'PUT': `
##  添加项目 [PUT /xx/xx/{id}]

+ Parameters

  + id (string) - 设备位置的ID

+ Request 

    + Headers
    
        Authorization: MAC id="",nonce="",mac=""

    + Body

        ${template.request ? template.request : `
        {

        }
        `}

+ Response 200 (application/json)

    ${template.response ? template.response : `
    {

    }
    `}              
`,
            'PATCH': `
##  添加项目 [PATCH /xx/xx]

+ Request (application/json)

    + Headers

        Authorization: MAC id="",nonce="",mac=""

    + Body

        ${template.request ? template.request : `
        {

        }
        `}

+ Response 200

    ${template.response ? template.response : `
    {
        
    }
    `}
`
        }
    }
    // react-codemirror 初始化不能更新值的bug
    if (data.type === 'init') {
        insertString(editor, data.value)
    } else {
        insertString(editor, obj[data.type][data.value])
    }
}
export default { execCommand }
