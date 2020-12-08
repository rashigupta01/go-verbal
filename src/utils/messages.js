const generateMessage = (link,roomNo)=>{
    return {
        link , 
        roomNo
      //  createdAt : new Date().getTime()
    }
}

module.exports = {
    generateMessage
}