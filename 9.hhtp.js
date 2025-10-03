const http = require('node:http')
const {findAvailablePort} = require('./10.free_port.js')
const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res)=> {
    console.log('Resquest received')
    res.end('Hola mundo')
})

findAvailablePort(desiredPort).then(port => {
    server.listen(0, ()=>{
        console.log(`Server listening on port http://localhost:${server.address().port}`)
    })
})  