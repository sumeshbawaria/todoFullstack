import React, { useEffect, useState } from 'react'
import cancel from '../assets/cancel.svg'
import { useTodoContainer } from '../context/ToDoContainerContext';

function ShowTodo({todo,showOnly}) {
    const {onChangeTodo,onToggleTodo,onDeleteTodo} = useTodoContainer();
    // console.log(todo);
    
    
    const toggleBox = () => {
        onToggleTodo(todo._id);
    };
    const handleChange = (e) => {
        onChangeTodo(todo._id, e.target.value);
    };
    const handleBlur = () => {

    };
    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            e.target.blur();
        }
    };
    const remove = () => {
        onDeleteTodo(todo._id)
    };
    

    return (
        <div>
            {showOnly ? 
            
            <div className={`group w-30 flex my-1 px-3 py-1 justify-start border-y border-transparent `}>
                <div>
                    <input type="checkbox" className='appearance-none h-3 w-3 rounded border border-gray-500 bg-transparent checked:border-blue-500 checked:bg-blue-500 cursor-default' name='todo_complete' onChange={toggleBox} checked={todo.completed} />
                </div>
                <input className={`w-40 ml-2 pl-2 ${todo.completed ? "line-through text-stone-400" : " "} overflow-hidden outline-0 border-0 cursor-default`} name='todos' value={todo.task}  readOnly/>
            </div> 

            :

            todo && 
            <div className={`group flex justify-evenly my-1 mx-4 px-3 py-1  border-y border-transparent ${!todo.completed &&"focus-within:border-gray-500" }`}>
                <div>
                    <input type="checkbox" className='appearance-none cursor-pointer h-3 w-3 rounded border border-gray-500 bg-transparent checked:border-blue-500 checked:bg-blue-500' name='todo_complete' checked={todo.completed} onChange={toggleBox}/>
                </div>

                <input className={`w-fit ml-2 pl-2 grow ${todo.completed ? "cursor-default line-through text-stone-400" : " "} outline-0 border-0`} name='todo' value={todo.task} readOnly={todo.completed} onChange={handleChange} onBlur={handleBlur} autoComplete='off' onKeyDown={handleKeyDown}/>
            
                <div className='flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30'>
                    <button className='mx-1 p-0.5 rounded-sm self-start' onClick={remove}>  
                        <img src={cancel} alt="" height={"20px"} width={'20px'}/></button>
                    </div>
                </div>
                }
        </div>
    )
}

export default ShowTodo