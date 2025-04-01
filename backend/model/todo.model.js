import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema(
    {
        todoListId: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        task: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        completed: {
            type: Boolean,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Todo = mongoose.model("Todo", todoSchema);