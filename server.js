const express = require('express')
const server = express()
const db = require('./database')

server.use(express.json())

server.get('/users',(req,res)=>{
    const users = db.getUsers()
    res.status(200).json(users)
})

