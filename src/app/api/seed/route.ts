import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function GET(request: Request) {

    await prisma.todo.deleteMany() // borrar todos los registros

    await prisma.todo.createMany({
        data: [
            { description: "Piedra del alma", complete: true },
            { description: "Piedra del poder" },
            { description: "Piedra del tiempo" },
            { description: "Piedra de la mente" },
            { description: "Piedra del espacio" },
            { description: "Piedra de la realidad" }
        ]
    })

    return NextResponse.json({ message: "Seed executed" })
}