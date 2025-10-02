const fs = require('node:fs')

const text = fs.readFileSync('./README.md', 'utf-8')

console.log('Leyendo el primer archivo...')
fs.readFile('./readme.md', 'utf-8', (err, text) => {
    console.log('primer texto: ', text)
})

console.log('Hacer cosas mientras lee el archivo...')

console.log('Leyendo el segundo archivo...')
fs.readFile('./readme.md', 'utf-8', (err, text) => {
    console.log('segundo texto: ', text)
})