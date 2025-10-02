const fs = require('node:fs/promises')

console.log('Leyendo el primer archivo...')
fs.readFile('./README.md', 'utf-8')
.then(text => {
    console.log('Primer texto:', text)
})

console.log('Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
fs.readFile('./README.md', 'utf-8')
.then(text => {
    console.log('segundo texto:', text)
})