'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

// export const sleep = async (seconds:number = 0) => {
//     return new Promise(resolve => setTimeout(() => {
//         resolve(true)
//     }, seconds * 1000))
// }


export const toggleTodo = async (id:string, complete:boolean):Promise<Todo> => {
    // 'use server' asi indica que solo esta funcion se va a plicar del lado del servidor

    // await sleep(3)

    const todo = await prisma.todo.findFirst({where: {id}})
    if (!todo) {
        throw new Error(`No todo found for id: ${id}`)
    }

    const updatedTodo = await prisma.todo.update({
        where: {id},
        data: {complete}
    })

    revalidatePath('/dashboard/server-todos') // recarga la ruta de forma destructiva, similar al router.refresh()
    return updatedTodo
}

export const addTodo = async (description:string):Promise<Todo> => {
    try {

        const todo = await prisma.todo.create({
            data: { description }
        })
        revalidatePath('/dashboard/server-todos') 
        return todo
    } catch (error) {
        throw new Error('Error creating todo')
    }
}

export const deleteCompleted = async ():Promise<void> => {
    try {
        await prisma.todo.deleteMany({
            where: {
                complete: true
            }
        })
        revalidatePath('/dashboard/server-todos') 
    } catch (error) {
        throw new Error('Error deleting completed todos')
    }
}