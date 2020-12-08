const express = require('express')
const {ensureAuthenticated} = require('../config/auth')
const router = express.Router()
const User = require('../models/User')
// Welcome Page
router.get('/', (req, res) => {
    res.render('welcome')
})

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user
    })
})


// room register
router.post('/registerRoom',async (req,res)=> {
    const {email ,  room } = req.body

    await User.findOneAndUpdate({email: email},{$push:{room:room}})
    res.render('registerRoom')
} )

//chat 
router.get('/chat', async(req, res) => {
    const {username ,  room } = req.body
 //   console.log("ans = " + req.body)
    console.log(username);
    console.log(room);
    await res.render('chat',{username : username,room : room })
})

module.exports = router