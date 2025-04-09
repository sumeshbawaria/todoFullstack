import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connect_db from './db/connectDB.js';

dotenv.config({
    path: './.env'
})

const app = express();
const port = 3500;

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(cors());
app.use(express.json({ limit: "16kb" })); // to parse JSON request body

app.get("/", (req, res) => {
    res.send("server ready")
})
// app.post("/api/registerTodos", (req, res) => {
//     const response = req.body;
//     console.log(response);

//     res.send(response)
// })

import router from './router/todoRouter.routes.js'

app.use("/api", router)

connect_db()
    .then(
        app.listen(port, () => {
            console.log(`PORT NUMBER is: ${port}`);
        })
    )
    .catch((error) => {
        console.log("ERROR in Connection: ", error);
    })