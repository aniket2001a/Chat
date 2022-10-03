const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

http.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

// Socket

const io = require('socket.io')(http)

io.on('connection', (socket) =>{
    console.log('Connected...') // A browser connected to our web socket
    socket.on('message', (msg) =>{
        // console.log(msg)
        socket.broadcast.emit('message', msg) // sends message to all other sockets except the sender
    })

    socket.on('new-user-joined', (name) =>{
        socket.broadcast.emit('new-user-joined', name);
    })
})