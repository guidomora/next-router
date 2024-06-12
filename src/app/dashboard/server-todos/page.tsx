// esto se debe aplicar solo a Pages, layout o routes
export const dynamic = 'force-dynamic' //  no se va a cachear y cada vez que se acceda a la pagina se va a construir de nuevo
export const revalidate = 0 // no se va a revalidar la pagina



import { NewTodo } from "@/app/todos/components/NewTodo"
import { TodosGrid } from "@/app/todos/components/TodosGrid"
import prisma from "@/lib/prisma"


// SERVER COMPONENT

export const metadata = {
  title: "Server Todos",
  description: "Server-rendered Todos page",
}

export default async function ServerTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } })


  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  )
}
