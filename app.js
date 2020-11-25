const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const app = express()
const { addUser , removeUser , getUser , getUsersInRoom } = require('./src/utils/users.js')
const http = require('http')
const { generateMessage } = require("./src/utils/messages.js")
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)

//require("./src/index.js");


// Passport config
require('./config/passport')(passport)

// DB Config
const db = process.env.MongoURI

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// public directory path
const publicDirectoryPath = path.join(__dirname, '/public')

// Static directory
app.use(express.static(publicDirectoryPath))

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Routes
app.use('/', require('./routers/index'))
app.use('/users', require('./routers/user'))


io.on('connection',(socket)=>{
    console.log('new websocket connection ')

    socket.on('join', ({ username , room },callback) => {
        console.log('333new websocket connection ')
        const  { error , user } = addUser({ id : socket.id , username , room })

        if(error){
            return callback(error)
        }

        socket.join(user.room)

        if(room==1) 
        socket.emit('message',generateMessage("https://meet.google.com/ecj-gxrx-kuy"))
        
        else if(room==2)
        socket.emit('message',generateMessage("https://meet.google.com/zat-rjic-jvu"))

        callback()
    })
    
    socket.on('sendmessage',(message,callback)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit('message',generateMessage(message))
        callback()
    })

})

server.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`))