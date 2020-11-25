//require('/src/index.js')

const socket = io()

const $messages =  document.querySelector('#messages')
const $messageTemplate = document.querySelector('#message-template').innerHTML 

const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix : true})

socket.on('message',(message)=>{
    console.log(message)
    const html = Mustache.render($messageTemplate,{
        message : message.text ,
    })

    $messages.insertAdjacentHTML('beforeend',html)
})

socket.emit('join', { username , room }, (error) => {
    if(error){
        alert(error)
        location.href =  '/'
    }
})