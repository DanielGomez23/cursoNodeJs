const fs = require('node:fs')
const stats = fs.statSync('./README.md')

console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size,
)