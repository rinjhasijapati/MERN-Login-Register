const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const PeopleModel = require('./models/People')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/people");

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    PeopleModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password) {
                res.json("Success!!")
            }else{
                res.json("The password is incorrect.")
            }
        }else{
            res.json("No such record exists.")
        }
    })
})

app.post('/register', (req, res) => {
    PeopleModel.create(req.body)
    .then(people => res.json(people))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})