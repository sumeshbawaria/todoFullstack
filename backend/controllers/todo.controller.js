import { Todo } from "../model/todo.model.js";
import { Todolist } from "../model/todoList.model.js";
import { v4 as uuidv4 } from 'uuid';

const registerTodos = async (req, res) => {
    const { todos } = req.body;

    // todos.forEach(value => {
    //     for (const key in value) {
    //         if (key === 'id') console.log(value[key]);
    //         if (key === 'todo') console.log(value[key]);
    //         if (key === 'completed') console.log(value[key]);
    //     }
    // });
    // for (let x in todos) {
    //     console.log(x);
    // }
    // console.log(typeof todos);

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
        const todoMsg = value['todo'];
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

}

export { registerTodos, fetchTodos }; 