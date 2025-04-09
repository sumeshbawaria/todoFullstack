import { v4 as uuidv4 } from "uuid";
import { Todo } from "../model/todo.model.js";
import { Todolist } from "../model/todoList.model.js";

const registerTodos = async (req, res) => {
    const { todos } = req.body;

    const listId = uuidv4();
    console.log("list id ; ", listId);
    try {
        const saveListData = await Todolist.create({
            todoListId: listId
        });
        console.log("Succefully created TodoList: ", saveListData);
    } catch (error) {
        console.log("Error in ", error);
    }

    for (const value of todos) {
        const todoMsg = value['task'];
        const todoCompleted = value['completed'];

        const saveTodoData = await Todo.create({
            todoListId: listId,
            task: todoMsg,
            completed: todoCompleted
        });

        console.log(saveTodoData);
    }

    // const saveTodosdata = await Todo.create({
    //     todoListId,
    //     task:
    // })


    res.send("done")
}

const fetchTodos = async (req, res) => {
    try {
        const { id } = req.query;

        const todos = await Todo.find({ todoListId: id });
        if (todos.length > 0) {
            res.status(200).json(todos);
        }
        else {
            res.status(400).json({ message: "no todo lists found" });
        }
    } catch (error) {
        console.log(error);
    }
}

const fetchTodoLists = async (req, res) => {
    try {
        const todolist = await Todolist.find({});
        // console.log("todo list: ", todolist.length);

        if (todolist.length > 0)
            res.status(200).json(todolist);
        else
            res.status(400).json({ message: "no todo lists found" });
    } catch (error) {
        console.error("Error retrieving todo lists: ", error);
        res.status(500).json({ message: "Failed to retrieve todo list", error });
    }
}

const deleteTodoList = async (req, res) => {

    const { id } = req.body;

    try {
        const deletingListResponse = await Todolist.deleteOne({ todoListId: id });
        const deletingTodoResponse = await Todo.deleteMany({ todoListId: id })
        console.log(deletingListResponse);
        console.log(deletingTodoResponse);


        res.status(200).json({
            success: true,
            deletedList: deletingListResponse,
            deletedTodos: deletingTodoResponse
        });
    } catch (error) {
        console.error("Error in deletingTodoList controller :: ", error);
        res.status(500).json({ success: false, error: error.message })
    }
}

export { registerTodos, fetchTodos, fetchTodoLists, deleteTodoList }; 