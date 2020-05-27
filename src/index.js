const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use((req,res, next)=>{
if(req.method==='GET'){
  res.send('GET requests are unabled')
}else next()

}) //this extra next in the route here is express middle ware. Middle ware is used to do some fnc before handling routes sunch as varifying authentication.

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const jwt= require('jsonwebtoken');
const myFunc = async ()=>{
 //CREATING TOKEN
  const token= jwt.sign({ _id: 'abc123'}, 'thisistheremix',{expiresIn: '7 days'})
  console.log(token)

  //VERIFYNG TOKENS

  const data = jwt.verify(token, 'thisistheremix')
  console.log(data)
}

myFunc();