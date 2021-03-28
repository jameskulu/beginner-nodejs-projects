const output = document.getElementById('output')
const message = document.getElementById('message')
const sendBtn = document.getElementById('sendBtn')
const username = document.getElementById('username')


const socket = io.connect("http://localhost:5000", { transports: ['websocket', 'polling', 'flashsocket'] })


sendBtn.addEventListener('click',()=>{
    socket.emit('chat-messages',{
        username:username.value,
        message:message.value
    })

})

socket.on('chat-messages',(data)=>{
    console.log(data)
    output.innerHTML += `<p><strong>${data.username}: </strong>${data.message}</p>`
})
