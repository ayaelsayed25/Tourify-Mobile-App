const express = require('express');
require('dotenv').config();
const app = express();
const PostRouter =require('./Routes/PostRoutes')


app.use(express.json());

app.use('/posts', PostRouter)


app.listen(process.env.PORT || '3000' , ()=>{
  console.log(`server running on port : ${process.env.PORT}`)
});