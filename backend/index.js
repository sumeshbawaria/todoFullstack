import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connect_db from './db/connectDB.js';

dotenv.config({
    path: './.env'
})

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: "https://todofullstack-f83z.onrender.com",
    credentials: true
}))

app.use(cors());
app.use(express.json({ limit: "16kb" })); // to parse JSON request body

app.get("/", (req, res) => {
    res.send("server ready")
})

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
