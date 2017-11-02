const fs = require('fs')
const path = require('path')
fs.writeFileSync(path.join(__dirname, '../src/config.js'), `exports.url = '${process.env.SERVER_URL}'\n`)
