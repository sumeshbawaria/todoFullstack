import React, { useState } from 'react'
import { useTodo } from '../context/ToDoContext';
import cancel from '../assets/cancel.svg';

function Todoitem({todo}) {

    // console.log("Inside todoitems: ",typeof todo);
    const [checkCompleted, setCheckCompleted] = useState('')

    const {deleteTodo, toggleComplete, changeTodo} = useTodo();

    const remove = () => {
        deleteTodo(todo.id)
    }

    const toggleBox = () => {
        toggleComplete(todo.id);
    }
    
    const capitalize = (value) => {
        const firstChar = value.charAt(0).toUpperCase();
        const restChar = value.slice(1,value.length)
        const capitalizeValue = firstChar.concat(restChar)

        return capitalizeValue
    }

    const handleChange = (e) => {
        changeTodo(todo.id,capitalize(e.target.value),false)
    }

    const handleBlur = (e) => {        
        const trimmedTodo = capitalize(e.target.value).trim();
        
        changeTodo(todo.id,trimmedTodo,true);
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            handleBlur;
            e.target.blur();
        }
    }


    return (
        <>
            {
                    todo && 
                    <div className={`group w-md flex my-1 px-3 py-1 items-center border-y border-transparent focus-within:border-gray-500`}>
    
                        <input type="checkbox" className='appearance-none cursor-pointer h-3 w-3 rounded border border-gray-500 bg-transparent checked:border-blue-500 checked:bg-blue-500' checked={todo.completed} onChange={toggleBox}/>
    
                        {/* <h1 className={`grow mx-2 px-2 ${todo.completed ? "line-through" : " "} overflow-hidden`}> {todo.todo}</h1> */}
                        <input className={`grow mx-2 px-2 ${todo.completed ? "line-through text-stone-400" : " "} overflow-hidden outline-0 border-0`} value={todo.task} onChange={handleChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        />
    
                        <div className='flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                            <button className='mx-1 p-0.5 rounded-sm '
                            onClick={remove}>  <img src={cancel} alt="" height={"20px"} width={'20px'}/></button>
                        </div>
                    </div>
            }
        </>
    )
}

export default Todoitem