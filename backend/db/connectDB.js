import mongoose from "mongoose";
import { DB_CONNECT } from '../constants.js'

const connect_db = async () => {
    try {
        const DBconnection = await mongoose.connect(`${process.env.MONGO_URI}/${DB_CONNECT}`)
        console.log(`\n MongoDB connected !! db host: ${DBconnection.connection.host}`);
    } catch (error) {
        console.log("MONGO CONNECTION ERROR: ", error);
        process.exit(1);
    }
}

export default connect_db;