const express = require('express')
const app = express()
const path = require('path')
const user = require('./routes/user')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app)
require('dotenv').config()

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
 })

io.on('connection', (socket) => {
    console.log('Socket connected');
    socket.on('diconnect', () => {
    })
    socket.on('mouse-down', (data) => {
        socket.broadcast.emit('mouse-down', data);
    })
    socket.on('mouse-drag', (data) => {
        socket.broadcast.emit('mouse-drag', data);
    })
    socket.on('mouse-up', (data) => {
        socket.broadcast.emit('mouse-up', data);
    })
})

// main()
// .then(() => {
//     console.log('Connected to database');
// })
// .catch((err) => {
//     throw err
// })

// async function main(){
//     console.log(process.env.DATABASE_URL);
//     await mongoose.connect(process.env.DATABASE_URL)
// }

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../client/build')))
app.use('/user', user)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
})