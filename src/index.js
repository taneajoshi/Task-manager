const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const bycrpt= require('bcryptjs');
const myFunc = async ()=>{
    const password= 'Red12345!';
    const hashedPass = await bycrpt.hash(password , 8) //8 is ideal number of time hashing should be performed on a password
    console.log(password);
    console.log(hashedPass);
}

myFunc();