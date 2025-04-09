import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import TodoForm from './TodoForm.jsx'
import Todoitem from './Todoitem.jsx'
import { ToDoProvider } from '../context/ToDoContext.js';
import { useGlobalContext } from '../context/globalContext.jsx';

function NewTodo() {
  const [todos, setTodos] = useState([]);  
  const [isVissible, setIsVissible] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null);
  const {postData} = useGlobalContext();

  const [checkCompletedTodo,setCheckCompltedTodo] = useState(false);

  const addTodo = (value) => {
    
    if(todos.find((todo) => todo.task === value.task)) return 
    
    setTodos((prev) => [
      {id: Date.now(), ...value}, 
      ...prev
    ]);
    console.log("inside newtodo setTodos: ", value);
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo)=>(prevTodo.id !== id) ))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (
      prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo
    )))
  }

  const changeTodo = (id,value,changeDone) => {
    setTodos((prev) => prev.map((todos) => todos.id === id ? {...todos, task:value} : todos))
    
    if(changeDone && value === "") deleteTodo(id)
  }

  const handleNewTodo = () => {
    setIsVissible((prev) => !prev)
  }

  const handleSaveTodo = async() => {
    await postData({todos});
    setTodos([])
  } 
  useEffect(() => {
    if(isVissible && inputRef.current){
      inputRef.current.focus();
    }
  },[isVissible]);

  useEffect(() => {
    setCheckCompltedTodo(todos.some((todo) => todo.completed))
  },[todos])


  useEffect(() => {
    const handleClickOutside = (e) => {
      if(containerRef.current && !containerRef.current.contains(e.target)) {
        if(todos.length > 0)handleSaveTodo();
        setIsVissible(false);
      };
  };

  if(isVissible){
    document.addEventListener("mousedown",handleClickOutside)
  }

  return () => {
    document.removeEventListener("mousedown",handleClickOutside);
  };
  },[isVissible,todos,postData]);

  return (
  <ToDoProvider value={{todos, setTodos, addTodo, deleteTodo, toggleComplete, changeTodo, postData}}>
    <div className='flex items-center justify-center mt-4' >

    {!isVissible ? <button className='border-1 py-1 px-3 rounded-lg' onClick={handleNewTodo}>New Todo</button>
    :
    <div ref={containerRef} className='w-md flex items-center justify-center flex-col rounded-lg border border-gray-400'>

      <TodoForm ref={inputRef}/>
        {
          todos.length > 0 ?
          <div className=' py-2'>
            {todos.map((todo) => (
              todo.completed === false && 
              <div key={todo.id}>
                <Todoitem todo={todo}/>
              </div>
            ))}
            <div>
            {checkCompletedTodo && <h1 className='my-4 mx-3 py-1 border-t border-gray-400'>Completed Tasks</h1>}
            {todos.map((todo) => (
              todo.completed === true &&
              <div key={todo.id}>
                <Todoitem todo={todo}/>
              </div>
            ))}
            </div>
          </div> :
          <div className='m-2 text-left'>No items</div>
          }
    </div>}
    </div>
  </ToDoProvider>
  )
}

export default NewTodo