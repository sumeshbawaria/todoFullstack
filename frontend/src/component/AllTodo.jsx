import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TodoContainer from './todoContainer'

function AllTodo() {
    const [list, setList] = useState([])

    const gettingTodoList = async() => {
        await axios.get("/api/fetchTodoLists")
        .then((response) => {
            setList(response.data);
        })
        .catch(error => {
            console.error("Error while fetching list data: ",error);
        })
    }

    useEffect(()=>{
        gettingTodoList();
    },[])

    return (

        <div className='flex justify-center items-center'>

        <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-1 space-y-4 m-2'>
            {
                list.map((item, index) => 
                    <div key={item.todoListId || index} className='my-1 m-2 h-fit flex justify-center'>
                        <TodoContainer todo={item.todoListId}/>
                    </div>
                )
            }
        </div>
            </div>
    )
}

export default AllTodo