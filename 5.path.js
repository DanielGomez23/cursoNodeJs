const path = require('node:path')

//unir rutas con path.join
//barra separadora de carpetas segun SO 
console.log(path.sep)

const filepath = path.join('content', 'subfolder', 'test.txt')
console.log(filepath)

const base = path.basename('/tmp/dani-secret-files/password.txt')
console.log(base)

const filename = path.basename('/tmp/dani-secret-files/password.txt', '.txt')
console.log(filename)

const extension = path.extname('image.jpg')
console.log(extension)