import React, { useEffect, useRef, useState } from 'react'
import axios, { toFormData } from 'axios';
import ShowTodo from './ShowTodo';
import cancel from '../assets/cancel.svg'
import { ToDoContainerProvider } from '../context/ToDoContainerContext';

function TodoContainer({todo}) {
    const [todos,setTodos] = useState([]);
    const [checkExpand, setCheckExpand] = useState(false)   
    const [checkCompleted,setCheckCompleted] = useState(false);
    const [changesMade, setChangesMade] = useState(false)

    const onChangeTodo = (id, value) => {
        setTodos((prev) => prev.map((todo)=>(todo._id === id ? { ...todo, task:value} : todo)));
        setChangesMade(true);
    }
    const onToggleTodo = (id) => {
        setTodos((prev) => prev.map((todo)=>(todo._id === id ? { ...todo, completed : !todo.completed} : todo)));
        setChangesMade(true);
    }
    const onDeleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
        setChangesMade(true);
    }

        const gettingTodo = async(todo) => {
            try {
                const response = await axios.get(`/api/fetchTodos`,
                    {params: {id:todo}}
                )
                setTodos(response.data)

            } catch (error) {
                console.error(error);
            }
        }

        useEffect(() => {
            gettingTodo(todo)
        },[todo]);

        const handleExpand = () => {
            setCheckExpand(true)
        }

        const removeExpand = () => {
            setCheckExpand(false);
            changesMade && gettingTodo(todo);
        }

        
    useEffect(()=>{
        setCheckCompleted( todos.some((todo) => todo.completed))
    },[todos,onToggleTodo])

    return (
            <ToDoContainerProvider value={{todos,onChangeTodo,onToggleTodo,onDeleteTodo}}>
            <div onClick={handleExpand}>
                { checkExpand ?            
                <div className='fixed top-0 left-0 w-full h-full bg-[#2c2c2c] bg-opacity-50 z-40 flex flex-row items-center justify-center transition-opacity rounded-xl'>
                    <div className='border-1 border-gray-600 opacity-100 h-fit max-h-4/5 w-[600px] my-2 scrollable-container rounded-md relative z-40 overflow-y-auto transition-all duration-5000 delay-1000' onClick={(e) => e.stopPropagation()}>
                    <div className='sticky top-0 right-0 flex justify-end bg-gray-600 p-1 mb-2'>
                        <button className='mx-2 py-1 px-2 rounded-lg hover:cursor-pointer hover:bg-gray-500'>DELETE</button>
                        <button className='mx-2 py-1 px-2 rounded-lg hover:cursor-pointer hover:bg-gray-500'>SAVE</button>
                        <button className='mx-2 py-1 px-2 rounded-lg hover:cursor-pointer hover:bg-gray-500' onClick={removeExpand}>
                            <img src={cancel} alt="" />
                        </button>
                    </div>
                    {
                    todos.length > 0 ?
                    todos.map((todo,index) =>(
                        !todo.completed &&
                        <ShowTodo key={index} todo={todo} showOnly={false}/>
                        )
                    )

                    : (
                        <p>No Todos Found</p>
                        )
                    }
                    {
                    checkCompleted &&
                    <h1 className='border-t-1 border-gray-600 mx-7 py-2'>Completed</h1>}
                    {todos.map((todo,index) =>(
                        todo.completed && 
                        <ShowTodo key={index} todo={todo} showOnly={false}/>
                        )
                        )}
                    </div>
                </div>
            :
            <div className='max-h-70 w-[250px] border border-orange-600 rounded-xl overflow-hidden'>
                {todos.length > 0 ?
                todos.map((item,index) =>(
                    index < 6 ?
                    <ShowTodo key={index} todo={item} showOnly={true}/>
                    :
                    <h1 className='ml-10 text-2xl'>. . . .</h1>
                    )) : (<p>No Todos Found</p>)}
                    </div>}
    </div>
    </ToDoContainerProvider>
    )
}

export default TodoContainer