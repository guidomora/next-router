import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"
import { boolean, object, string } from "yup";

interface Segments {
    params: {
        id: string
    }

}

export async function GET(request: Request, { params }: Segments) {
    const { id } = params;
    const todo = await prisma.todo.findUnique({
        where: {
            id: id
        }
    })

    if (!todo) {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }


    return NextResponse.json({ todo })
}

// ----------------------------------------------------------

const putSchema = object({
    complete: boolean().optional(), // si no viene va a ser undefined
    description: string().optional(),
})


export async function PUT(request: Request, { params }: Segments) {
    const { id } = params;
    const todo = await prisma.todo.findUnique({
        where: {
            id: id
        }
    })

    if (!todo) {
        return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }

    try {
        const { complete, description } = await putSchema.validate(await request.json())
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { complete, description }
        })

        return NextResponse.json({ updatedTodo })
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}

