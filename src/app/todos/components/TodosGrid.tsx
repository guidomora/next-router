'use client'

import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem"
import * as todosApi from '../helpers/todosHelper'
import { useRouter } from "next/navigation"
import { toggleTodo } from "../actions/todo-actions" // SERVER SIDE FUNCTION


interface Props {
    todos?: Todo[]
}

export const TodosGrid = ({todos=[]}:Props) => {
  const router = useRouter()
    
  // CLIENT SIDE FUNCTION
  // const toggleTodo = async(id:string, complete:boolean) => {

  //   const updatedTodo = await todosApi.updateTodo(id, complete)
  //   router.refresh() // recarga la ruta pero no de forma destructiva
  // } 
  
  // SERVER SIDE FUNCTION
  // toggleTodo


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        { todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
        ))}
    </div>
  )
}
