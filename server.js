const express = require('express')
const server = express()
const db = require('./database')

server.use(express.json())

//get all users
    server.get('/api/users',(req,res)=>{
        try{
            const users = db.getUsers()
            res.status(200).json(users)
        }
        catch (error){
            res.status(500).json({errorMessage: "The users information could not be retrieved."})
        }
        
    })

// post user

    server.post('/api/users',(req,res)=>{
        try{
            let name = req.body.name

            if(!name){ //no name is provided
             return   res.status(400).json({errorMessage: 'Please provide a name'})
            }
            
             const newUser = db.createUser({
                name:req.body.name
            })

             res.status(201).json(newUser)
            
        } 
        catch (error){
            res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
        }
    
    })

//get user based on id
    server.get('/api/users/:id',(req,res)=>{
        let user = db.getUserById(req.params.id)
        try{
            if(user){
                res.status(200).json(user)
            }
            else 
            {
                res.status(404).json({message:"The user with the specified ID does not exist."})
            }
            
        }
        catch (error){
            res.status(500).json({errorMessage: "The user information could not be retrieved."})
        }
        
    })

//  edit user based on id

    server.put('/api/users/:id',(req,res)=>{
        
        let user = db.getUserById(req.params.id)

        try{
            if(user){
                let updatedUser = db.updateUser(req.params.id,{name: req.body.name || user.name})
                res.status(200).json(updatedUser)

            } else {
                res.status(400).json({message:"The user with the specified ID does not exist."})
            }

        }catch (error){
            res.status(500).json({errorMessage: "The user information could not be modified."})
        }
    })

    //  delete the active user
    
    server.delete('/api/users/:id',(req,res)=>{
        let user = db.getUserById(req.params.id)

        try{
            if(!user){
                res.status(400).json({message:"The user with the specified ID does not exist."})

            } else {
                let users = db.deleteUser(req.params.id)
                res.status(204).json(users)
            }

        }catch (error){
            res.status(500).json({errorMessage: "The user information could not be modified."})
        }

    })

server.listen(8080,(req,res)=>{
    console.log('listening on http://localhost:8080')
})

