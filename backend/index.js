import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connect_db from './db/connectDB.js';

dotenv.config({
    path: './.env'
})

const app = express();
const port = process.env.PORT;
const allowedOrigins = [
    "http://localhost:5173",
    "https://todo-fullstack-bnug-git-main-sumesh-bawarias-projects.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));


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