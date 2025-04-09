import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TodoContainer from './todoContainer';
import { useGlobalContext } from '../context/globalContext.jsx'


function AllTodo() {
    const {fetchTodoLists, todoLists} = useGlobalContext();

    useEffect(()=>{
        fetchTodoLists();
    },[fetchTodoLists])

    return (
        <div className='flex justify-center items-center mt-2'>
            <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-0 space-y-4 my-2'>
                {
                    todoLists.map((item, index) => 
                        <div key={item.todoListId || index} className='mx-2 h-fit flex justify-center'>
                            <TodoContainer todo={item.todoListId} onRefresh={fetchTodoLists}/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default AllTodo