const User = require('../../models/User')

const addUser = async ({ id ,username , room }) => {
    email = username;

    console.log("in users= " + username + room)
    if(!username || !room){
        return {
            error : 'Both username and room are required to enter !!'
        }
    }

    user = await User.findOne({email: email}) // .then(user => {
       // console.log(existingUser) 

        existingUser = await user.room.find((roomF)=>{
            return roomF === room } )
        
        //console.log("exost = "+existingUser)
        if(existingUser==undefined)
        {
            room = 10;
        }
        console.log("check =  "+room)
        //Add new User
        

  //  }) .catch(err => console.log(err))

    const user1 =  { id, username, room} 
    //users.push(user)
    return { user1 }
   
}


// Remove the user 
const removeUser = (id) => {
    const index = users.findIndex( (user) => user.id ===id )
    
    if(index != -1){
        return users.splice(index , 1)[0]
    }
}

const getUser = (id) =>{
    return users.find((user)=> user.id === id)
}

const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user)=> user.room === room )
}

module.exports = {
    addUser ,
    removeUser ,
    getUser ,
    getUsersInRoom
}

