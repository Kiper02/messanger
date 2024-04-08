import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import path from 'path'

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const __dirname = path.resolve()


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

var users = []
var connections = []

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket), 1)
    })

    socket.on('send mess', (data) => {
        io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className})
    })
})




server.listen(3000)