const ecpress = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const PeopleModel = require('./models/People')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/people");

app.post('/register', (req, res) => {
    PeopleModel.create(req.body)
    .then(people => res.json(people))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server is running")
})