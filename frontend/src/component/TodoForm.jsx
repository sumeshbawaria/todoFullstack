import React, { forwardRef, useEffect, useRef, useState } from 'react'
import {useTodo} from '../context/ToDoContext.js'

const TodoForm = forwardRef((props, ref)=> {
    const [todo, setTodo] = useState('');
    const {addTodo} = useTodo();
    let trimmedTodo;

    const capitalize = (value) => {
        const firstChar = value.charAt(0).toUpperCase();
        const restChar = value.slice(1,value.length)
        const capitalizeValue = firstChar.concat(restChar)

        return capitalizeValue
    }

    const handleTodo = (e) => {
        e.preventDefault();

        trimmedTodo = todo.trim();

        trimmedTodo = capitalize(trimmedTodo)

        if(!trimmedTodo)return

        addTodo({todo: trimmedTodo, completed: false});
        setTodo('')
    }

    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            handleTodo(e);
        }
    }


    return (
        <>        
            <div className='border-b-1 border-gray-400 w-md flex justify-center items-center flex-row' >
                <input ref={ref} type="text" name="todo" id="todo" autoComplete='off' 
                placeholder='Enter new task...'
                className='px-4 py-2 w-md focus:outline-none placeholder:text-stone-300 placeholder:font-medium '
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    onBlur={handleTodo}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </>
    );
});

export  default TodoForm;