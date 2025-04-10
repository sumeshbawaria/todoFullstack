import React, { useEffect, useRef, useState } from 'react'
import axios, { toFormData } from 'axios';
import ShowTodo from './ShowTodo';
import cancel from '../assets/cancel.svg';
import { ToDoContainerProvider } from '../context/ToDoContainerContext';
import { useGlobalContext } from '../context/globalContext';

function TodoContainer({todo}) {
    const [todos,setTodos] = useState([]);
    const [checkExpand, setCheckExpand] = useState(false);   
    const [checkCompleted,setCheckCompleted] = useState(false);
    const [changesMade, setChangesMade] = useState(false);
    const [initialTodos,setInitialTodos] = useState([]);
    const [changesTodos, setChangeTodos] = useState([]);
    const [deletedTodos, setDeletedTodos] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const {deleteTodoList, updateTodo, deleteTodos} = useGlobalContext();


    const onChangeTodo = (id, value) => {
        setTodos((prev) => prev.map((todo)=>(todo._id === id ? { ...todo, task:value} : todo)));
        setChangesMade(true);
    }

    const onToggleTodo = (id) => {
        setTodos((prev) => prev.map((todo)=>(todo._id === id ? { ...todo, completed : !todo.completed} : todo)));
        setChangesMade(true);
    }

    const onDeleteTodo = (id) => {
        const deleteTodo = todos.find((todo) => todo._id === id)
        setDeletedTodos((prev) => [...prev, deleteTodo._id]);

        setTodos((prev) => prev.filter((todo) => todo._id !== id));
        setChangesMade(true);
    }

    const gettingTodo = async(todo) => {
        try {
            const response = await axios.get(`https://todofullstack-f83z.onrender.com/api/fetchTodos`,
                {params: {id:todo}}
            )
            setTodos(response.data);
            setInitialTodos(response.data);

        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteTodoList = async() => {
        try {
            const response = await deleteTodoList({id: todo});
            closeDeleteConfirmation();
            console.log(response);
            removeExpand();
        } catch (error) {
            console.error(error);            
            closeDeleteConfirmation();
        }
        
    }

    const closeDeleteConfirmation = () => {
        setConfirmDelete(false)
    }

    useEffect(() => {
            gettingTodo(todo)
    },[todo]);

    const handleExpand = () => {
            setCheckExpand(true)
    }

    const removeExpand = () => {        
            setCheckExpand(false);
            if(changesMade){
                gettingTodo(todo);
                setChangesMade(false);
            }
            if(deletedTodos){
                setDeletedTodos([]);
                setChangeTodos([]);
            }
    }

    const handleSave = async() => {
        const updatedTodo = todos.filter((currentTodo) => 
            initialTodos.some((todo) => 
                todo._id === currentTodo._id && 
                (currentTodo.task !== todo.task || 
                currentTodo.completed !== todo.completed)
            )
        );
        if(updatedTodo.length > 0){
            try {
                const response = await updateTodo(updatedTodo);
                console.log("response: ",response);
            } catch (error) {
                console.error(error);            
            }
            updatedTodo([])
            setChangesMade(false);
            gettingTodo(todo);
        }

        if(deletedTodos.length > 0){
            try {
                const response = await deleteTodos(deletedTodos);
                console.log(response);  
            } catch (error) {
                console.error("deleteTodos todocontainer :: ERR :: ",error);                
            }          
        }

    }

    useEffect(()=>{
        setCheckCompleted( todos.some((todo) => todo.completed))
    },[todos,onToggleTodo])

    return (
            <ToDoContainerProvider value={{todos,onChangeTodo,onToggleTodo,onDeleteTodo}}>
            <div onClick={handleExpand}>
                { checkExpand ?            
                <div className='fixed top-0 left-0 w-full h-full bg-[#2c2c2c] z-40 flex flex-row items-center justify-center'>
                    <div className='border-1 border-gray-600 opacity-100 h-fit max-h-4/5 w-[600px] my-2 scrollable-container rounded-md relative z-50 overflow-y-auto transition-h duration-1000 delay-500' onClick={(e) => e.stopPropagation()}>
                    <div className='sticky top-0 right-0 flex justify-end bg-gray-600 p-1 mb-2'>
                        <button className='mx-2 py-1 px-2 rounded-lg hover:cursor-pointer hover:bg-gray-500' onClick={()=>setConfirmDelete(true)}>DELETE</button>
                        <button className='mx-2 py-1 px-2 rounded-lg hover:cursor-pointer hover:bg-gray-500' onClick={handleSave}>SAVE</button>
                        <button className='mx-2 py-1 px-2 rounded-lg hover:cursor-pointer hover:bg-gray-500' onClick={removeExpand}>
                            <img src={cancel} alt="" />
                        </button>
                    </div>
                    {
                        todos.length > 0 ?
                        todos.map((todo) =>(
                            !todo.completed &&
                            <ShowTodo key={todo._id} todo={todo} showOnly={false}/>
                        )
                    )
                    : (
                        <p>No Todos Found</p>
                    )
                }
                    {
                    checkCompleted &&
                    <h1 className='border-t-1 border-gray-600 mx-7 py-2'>Completed</h1>}
                    {todos.map((todo) =>(
                        todo.completed && 
                        <ShowTodo key={todo._id} todo={todo} showOnly={false}/>
                    )
                )}
                    </div>
                    {confirmDelete &&                 
                    <div className='fixed flex justify-center items-center  w-full h-full bg-[#1a1a1a] z-50 'onClick={closeDeleteConfirmation}>
                            <div className=' border border-gray-600 rounded-xl w-[600px]'>
                                <h1 className='bg-gray-600 p-2 rounded-t-lg'>Confirm Delete</h1>
                                <div className='pt-3'>
                                <button className='m-1 border border-gray-600 px-3 py-1 rounded-lg hover:bg-gray-600  transition-all duration-300' onClick={() => handleDeleteTodoList()}>Delete</button>
                                <button className='m-1 border border-gray-600 px-3 py-1 rounded-lg hover:bg-gray-600  transition-all duration-300' onClick={() => setConfirmDelete(false)}>Cancel</button>
                                </div>
                            </div>
                    </div>
                } 
                </div>
            :
            <div  className='group relative max-h-70  sm:w-[245px] w-[350px] border border-gray-600 rounded-xl overflow-hidden'>
                {todos.length > 0 ?
                todos.map((item,index) =>(
                    index < 6 ?
                    <ShowTodo key={item._id} todo={item} showOnly={true}/>
                    :
                    <h1 key={item._id} className='ml-10 text-2xl'>. . . .</h1>
                )) : (<p>No Todos Found</p>)}
            </div>}
        </div>
    </ToDoContainerProvider>
    )
}

export default TodoContainer