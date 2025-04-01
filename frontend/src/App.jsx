import React, { isValidElement, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import TodoForm from './component/TodoForm.jsx'
import Todoitem from './component/Todoitem.jsx'
import { ToDoProvider } from './context/ToDoContext.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState([]);    
  const [isVissible, setIsVissible] = useState(false)
  const inputRef = useRef(null)

  const containerRef = useRef(null); 
  // const prevTodosRef = useRef([]);

  const [checkCompletedTodo,setCheckCompltedTodo] = useState(false)

  const addTodo = (value) => {
    if(todos.find((todo) => todo.todo === value.todo)) return 

    // console.log(value);
    

    setTodos((prev) => [
      {id: Date.now(), ...value}, 
      ...prev
    ]);
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
    setTodos((prev) => prev.map((todos) => todos.id === id ? {...todos, todo:value} : todos))
    
    if(changeDone && value === "") deleteTodo(id)
  }

  const handleNewTodo = () => {
    setIsVissible((prev) => !prev)
  }

  // useEffect(()=>{
  //   const todos = JSON.parse(localStorage.getItem("todo"));

  //   if(todos && todos.length > 0){
  //     setTodos(todos);
  //   }
  // },[])

  // useEffect(() => {
  //   localStorage.setItem("todo", JSON.stringify(todos));
  // },[todos])

  useEffect(() => {
    if(isVissible && inputRef.current){
      inputRef.current.focus();
    }
  },[isVissible]);

  useEffect(() => {
    setCheckCompltedTodo(todos.some((todo) => todo.completed))
  },[todos])

  const postData = async () => {
    await axios.post("http://localhost:3500/api/registerTodo",{todos})
    .then((response) => {
      console.log(response);
      setTodos([]);
    })
    .catch((error) => console.log("Error in post todo", error))
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(containerRef.current && !containerRef.current.contains(e.target)) {
        if(todos.length > 0)postData();
        setIsVissible(false);
      };
  };

  if(isVissible){
    document.addEventListener("mousedown",handleClickOutside)
  }

  return () => {
    document.removeEventListener("mousedown",handleClickOutside);
  };
},[isVissible,todos])


  return (
  <ToDoProvider value={{todos, addTodo, deleteTodo, toggleComplete, changeTodo}}>
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
            { checkCompletedTodo &&
            <h1 className='my-4 mx-3 py-1 border-t border-gray-400'>Completed Tasks</h1>}
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

export default App