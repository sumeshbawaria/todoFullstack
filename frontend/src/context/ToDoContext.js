import { createContext, useContext } from "react";

const ToDoContext = createContext(
    {
        todos: {
        },
        addTodo: (todo) => { },
        deleteTodo: (id) => { },
        toggleComplete: (id) => { },
        changeTodo: (id, value, changeDone) => { }
    }
)

export const useTodo = () => {
    return useContext(ToDoContext);
}

export const ToDoProvider = ToDoContext.Provider;