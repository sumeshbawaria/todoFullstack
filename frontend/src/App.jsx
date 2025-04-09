import React from 'react'
import NewTodo from './component/NewTodo'
import AllTodo from './component/AllTodo'
import { GlobalTodoProvider } from './context/globalContext.jsx'

function App() {
    return (
        <GlobalTodoProvider>
            <NewTodo/>
            <AllTodo/>
        </GlobalTodoProvider>
    )
}

export default App