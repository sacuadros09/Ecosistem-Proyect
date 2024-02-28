const express  = require("express")
const cors = require ("cors")
const z = require("zod")


const app = express()
app.use(cors())
app.use(express.json())

const users = []


app.get('/', (req,res) => {
    res.send("Hello Word")
})

app.get('/users/:id', (req,res) => {
    const id = req.params.id
    res.send({id})
})


app.listen(3000,() => {
    console.log("Server is running on port 3000")
})