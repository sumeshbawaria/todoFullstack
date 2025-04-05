import { createContext, useContext } from "react";

const ToDoContainerContext = createContext({
    todos: {},
    toggleComplete: (id) => { },
    removeTodo: (id) => { },
    changeTodo: (id, value) => { }
})

export const useTodoContainer = () => {
    return useContext(ToDoContainerContext);
}

export const ToDoContainerProvider = ToDoContainerContext.Provider;