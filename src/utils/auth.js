var CryptoJS = require('crypto-js')
let MD5 = require('md5.js')

function randomCode() {
    let code = ''
    let codeLength = 8// 验证码的长度
    let chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    // 所有候选组成验证码的字符，当然也可以用中文的

    for (let i = 0; i < codeLength; i++) {
        let charIndex = Math.floor(Math.random() * 36)
        code += chars[charIndex]
    }
    return code
}

export function getAuthorization(method, url, host, accessToken, macKey) {
    method = method.toUpperCase()
    url = encodeURI(url)

    let nonce = new Date().getTime() + ':' + randomCode()

    let _getMac = () => {
        let path
        let pos = url.indexOf('://')
        if (pos > 0) {
            path = url.substring(pos + 3)
            pos = path.indexOf('/')
            host = path.substr(0, pos)
            path = path.substring(pos)
        } else {
            path = url
        }
        let requestContent = nonce + '\n' + method + '\n' + path + '\n' + host + '\n'
        let hash = CryptoJS.HmacSHA256(requestContent, macKey)
        let mac = hash.toString(CryptoJS.enc.Base64)
        return mac
    }
    let mac = _getMac()

    let strAuth = `MAC id="${accessToken}",nonce="${nonce}",mac="${mac}"`
    return strAuth
}

export function passWord(str1, str2) {
    let handle = str => {
        return new MD5().update(str).digest('hex')
    }
    return handle(`${str1.substring(0, 2)}${handle(str2)}${str1.substring((str1.length - 2))}123`) // md5(用户名前2位+md5(密码)+用户名后两位+123)
}
