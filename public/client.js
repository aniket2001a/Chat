const socket = io()
let name;
const music = new Audio('/ring.mp3')
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')
} while(!name)

socket.emit('new-user-joined', name);

socket.on('new-user-joined', (name) =>{
    const newUser = document.createElement('div');
    let userMarkup = `<h4 style="text-align: center; font-weight: 100;"> ${name} joined the chat </h4> <br>`;
    // console.log(`${name} joined the chat`);
    newUser.innerHTML = userMarkup;
    messageArea.appendChild(newUser);
    music.play();
})

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')

    textarea.value = ''

    music.play()

    scrollToBottom()

    // Send to server
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}


// Receive messages

socket.on('message', (msg) =>{
    // console.log(msg)
    appendMessage(msg, 'incoming')
    music.play()

    scrollToBottom()
})


function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}