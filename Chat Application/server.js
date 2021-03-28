const express = require("express");
const app = express();
const socketIO = require('socket.io')
const cors = require('cors')


app.use(cors())

const PORT = process.env.PORT || 5000
const server = app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`))


const io = socketIO(server)

io.on("connection",(socket)=>{
  console.log("New client has been connected")
  socket.on("chat-messages",(data)=>{
    io.sockets.emit('chat-messages',data)
  })
})