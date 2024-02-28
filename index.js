const express  = require("express")
const cors = require ("cors")
const z = require("zod")


const app = express()
app.use(cors())
app.use(express.json())


app.get('/', (req,res) => {
    res.send("Hello Word")
})


app.listen(3000,() => {
    console.log("Server is running on port 3000")
})