const socket = io()

const $messages =  document.querySelector('#messages')
const $messageTemplate = document.querySelector('#message-template').innerHTML   
const $errorTemplate = document.querySelector('#error-template').innerHTML 

const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix : true})
console.log("chat.js = "+username + room);

socket.on('message',(message)=>{
    console.log(message)
    var html;
    if(message.roomNo==10)
    {
        console.log("room no 10");
        html = Mustache.render($errorTemplate,{
            link : message.link  })
           // rommNo : message.roomNo 
     //      $messages.insertAdjacentHTML('beforeend',html)
    }
    else{
        console.log("room no not 10");
        html = Mustache.render($messageTemplate,{
            link : message.link })
    }
    
    
    $messages.insertAdjacentHTML('beforeend',html) 
})

socket.emit('join', { username , room }, (error) => {
    if(error){
        alert(error)
        location.href =  '/'
    }
})