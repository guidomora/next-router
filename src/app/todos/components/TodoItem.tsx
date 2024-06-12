'use client'

import { Todo } from "@prisma/client"
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5"
import { startTransition, useOptimistic } from "react"

interface Props {
    todo: Todo
    toggleTodo: (id:string, complete:boolean) => Promise<Todo | void> // devuelve una promesa que resuelve un Todo o void
}

export const TodoItem = ({todo, toggleTodo}:Props) => {
  // funciona igual que el useState, el estado inicial es el todo que se le pasa
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(todo,
    (state, newCompleteValue:boolean) => ({...state, complete: newCompleteValue}) // funcion que se ejecuta cuando se cambia el estado (toggleTodoOptimistic)
    // al estado le pasamos un nuevo argumento que seria el nuevo valor de complete
  )

  const onToggleTodo = async () => {
    try {
      // inicia la transicion
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete)) // cambiamos el estado optimista, si estaba en true, lo cambia a false y viceversa)
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete) // llamamos a la funcion que cambia el estado real
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete)) 
    }
  }

  return (
    <div
    // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
    onClick={onToggleTodo}
     className={todo.complete ? styles.todoDone : styles.todoPending}>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
            <div className={`flex p-2 rounded-md cursor-pointer
             hover:bg-opacity-60 ${todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'}`}>
                
                {todoOptimistic.complete ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} />}
            </div>
            <div className="text-center sm:text-left">
                {todoOptimistic.description}
            </div>

        </div>
    </div>
  )
}

