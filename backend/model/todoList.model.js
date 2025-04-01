import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'UUID'

const todoListSchema = new Schema(
    {
        todoListId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        }
    },
    {
        timestamps: true
    }
)

export const Todolist = mongoose.model("TodoList", todoListSchema)