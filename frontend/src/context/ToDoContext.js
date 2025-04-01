import { createContext, useContext } from "react";

const ToDoContext = createContext()

export const useTodo = () => {
    return useContext(ToDoContext);
}

export const ToDoProvider = ToDoContext.Provider;