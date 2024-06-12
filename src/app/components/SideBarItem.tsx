'use client'

import { CiBookmarkCheck } from "react-icons/ci";

import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";


interface Props {
    icon: React.ReactNode
    title: string
    path: string
}

const SideBarItem = ({icon, path, title}:Props) => {

    const pathName = usePathname()


    {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */ }
    return (
        < li >
            <Link href={path} className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl
            hover:bg-gradient-to-r from-sky-600 to-cyan-400 hover:text-white
            ${path === pathName ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : "" } `}>
                {icon}
                <span className="-mr-1 font-medium">{title}</span>
            </Link>
        </li >
    )
}

export default SideBarItem