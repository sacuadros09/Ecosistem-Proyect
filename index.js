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

app.get('/users', (req,res) => {
   console.log("Query:",req.query)
   console.log("Headers:",req.headers)
    res.send({users})
})

app.get('/users/:id', (req,res) => {
    const id = req.params.id
    res.send({id})
})

app.post('/users', (req, res) => {    
    const {name, last, email,code,password} = req.body;
    if (!name || !last || !email || !code || !password) {
        return res.status(400).send({error: "Invalid data"});
    }
    const user = {
        name,
        last,
        email,
        code,
        password
    };
    users.push(user);
    res.send({user});
});

app.post('/tasks', (req, res) => {
const taskSchema = z.object({
    name: z.string(),
    last: z.string(),
    email: z.string().email(),
    code: z.union([z.string(), z.number()]),
    password: z.string()
});
const taskValidation = taskSchema.safeParse(req.body);

if (!taskValidation.success) {
    return res.status(400).send({ error: "Invalid data", details: taskValidation.error });
}


const sanitizedTask = { ...taskValidation.data };


sanitizedTask.password = "********";
res.send({ task: sanitizedTask });
});


app.post('/register', (req, res) => {
    const registerSchema = z.object({
        name: z.string(),
        last: z.string(),
        email: z.string().email(),
        code: z.union([z.string(), z.number()]),
        password: z.string()
    });

    const registerValidation = registerSchema.safeParse(req.body);

    if (!registerValidation.success) {
        return res.status(400).send({ error: "Invalid data", details: registerValidation.error });
    }

    const newUser = { ...registerValidation.data };
    newUser.password = "********";

    // Almacenar en el array de usuarios
    users.push(newUser);

    res.send({ user: newUser });
}); 







app.listen(3000,() => {
    console.log("Server is running on port 3000")
})


