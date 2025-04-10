import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios"
const GlobalContext = createContext();

export const GlobalTodoProvider = ({ children }) => {
    const [todoLists, setTodoLists] = useState([]);

    const fetchTodoLists = useCallback(async () => {
        try {
            const response = await axios.get("https://todofullstack-f83z.onrender.com/api/fetchTodoLists");
            setTodoLists(response.data);
        } catch (error) {
            console.error("Error in fetching Todo list: ", error);
        }
    }, []);
    
    const addTodoToTodoList = async (todoListId, newTodo) => {
        try {
            const response = await axios.post(`https://todofullstack-f83z.onrender.com/api/addTodo/${todoListId}`, newTodo);
            fetchTodoLists();
            console.log("Todo added: ", response.data);
        }
        catch (error) {
            console.error("Error in add todo to todo list :: ", error);
        }
    }
    
    const postData = useCallback(async ({ todos }) => {
        try {
            const response = await axios.post("https://todofullstack-f83z.onrender.com/api/registerTodo", { todos });
            console.log("Registering new todo list successfully: ", response);
            
            await fetchTodoLists();
        } catch (error) {
            console.log("Error in post todo", error);
        }
    }, [fetchTodoLists]);

    
    const deleteTodoList = useCallback(async (id) => {
        try {        
            const response = await axios.post('https://todofullstack-f83z.onrender.com/api/deleteTodoList',id);
            console.log("Successfully deleted todo list: ",response);

            await fetchTodoLists();

            return response;
        } catch (error) {
            console.log("Delete Todo list ERROR :: ", error);
        }
    },[fetchTodoLists]);

    const updateTodo = useCallback(async(todos) => { 
        // console.log("Here in updateTodo globalcontext: ",todo.updatedTodo);
        
        try {
            const response = await axios.post("https://todofullstack-f83z.onrender.com/api/updateTodo",{todosForUpdating: todos})
            return response
        } catch (error) {
            console.error("Updating todo errr :: ",error);
        }
    },[fetchTodoLists]) 

    const deleteTodos = useCallback(async(todos) => {
        try {
            const response = axios.post("https://todofullstack-f83z.onrender.com/api/deleteTodosFromDB",{todos});
            return response;            
        } catch (error) {
            return error;
        }
    },[])

    useEffect(() => {
        const init = async () => {
            await fetchTodoLists();
        }
        init();
    }, [fetchTodoLists]);

    return (
        <GlobalContext.Provider value={
            { 
                todoLists, 
                postData, 
                addTodoToTodoList, 
                fetchTodoLists, 
                deleteTodoList, 
                updateTodo,
                deleteTodos
            }
        }>
        {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};