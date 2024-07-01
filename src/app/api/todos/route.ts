import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { boolean, object, string } from "yup"
import { getUserSessionServer } from "../auth/actions/auth-actions"


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url) // obtenemos los parametros de la url
    const take = searchParams.get('take') ?? '10' // obtenemos el parametro take, si no existe, por defecto es 10
    const skip = searchParams.get('skip') ?? '0' // obtenemos el parametro take, si no existe, por defecto es 10
    if (isNaN(+take)) { // si take no es un numero
        return NextResponse.json({ error: 'Take must be a number' }, { status: 400 }) // retornamos un error
    }


    if (isNaN(+skip)) { // si skip no es un numero
        return NextResponse.json({ error: 'skip must be a number' }, { status: 400 }) // retornamos un error
    }


    const todos = await prisma.todo.findMany({
        take: +take, // con el + convertimos el string a number ya que take es un string y findMany espera un number
        skip: +skip
    })


    return NextResponse.json(todos)
}
// ----------------------------------------------------------
// Esquema de validacion para el body
const postSchema = object({
    description: string().required(),
    complete: boolean().optional().default(false)
})


export async function POST(request: Request) {
    const user = await getUserSessionServer()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    try {
        const { complete, description } = await postSchema.validate(await request.json()) // validamos el body con el esquema de validacion

        const todo = await prisma.todo.create({
            data: { complete, description, userId: user.id }
        })
        return NextResponse.json({ todo })
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }

}


export async function DELETE(request: Request) {


    try {
        await prisma.todo.deleteMany({
            where: {
                complete: true
            }
        })
        return NextResponse.json('Todos deleted')
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }

}