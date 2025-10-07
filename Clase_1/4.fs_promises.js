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

// function getSumNum(a, b) {
//   const customPromise = new Promise((resolve, reject) => {
//     const sum = a + b;

//     if(sum <= 5){
//       resolve("Let's go!!")
//     } else {
//       reject(new Error('Oops!.. Number must be less than 5'))
//     }
//   })

//   return customPromise
// }

// // consuming the promise
// getSumNum(1, 3).then(data => {
//   console.log(data)
// })
// .catch(err => {
//   console.log(err)
// })

