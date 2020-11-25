const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const path = require('path')

const app = express()

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

app.listen(process.env.PORT, console.log(`Server started on port ${process.env.PORT}`))