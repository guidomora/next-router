import Link from 'next/link'
import React from 'react'
import { CiLogout } from 'react-icons/ci'
import SideBarItem from './SideBarItem'
import Image from 'next/image'
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPerson } from 'react-icons/io5'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

const menuItems = [
    {icon: <IoCalendarOutline />, title:'Dashboard', path:'/dashboard'},
    {icon: <IoCheckboxOutline />, title:'Rest TODOS', path:'/dashboard/rest-todos'},
    {icon: <IoListOutline />, title:'Server Actions', path:'/dashboard/server-todos'},
    {icon: <IoCodeWorkingOutline />, title:'Cookies', path:'/dashboard/cookies'},
    {icon: <IoBasketOutline />, title:'Products', path:'/dashboard/products'},
    {icon: <IoPerson />, title:'Profile', path:'/dashboard/profile'},
]

const  SideBar = async() => {
    const session = await getServerSession(authOptions);
    const userName = session?.user?.name ?? 'No name'
    const userImage = session?.user?.image ?? 'https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg'
    return (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                <div className="-mx-6 px-6 py-4">
                    {/* TODO: Next/Link hacia dashboard */}
                    <Link href="/" title="home">
                        <Image height={150} width={150} src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" className="w-32" alt="tailus logo" />
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    <Image height={150} width={150} src={userImage} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
                    <span className="hidden text-gray-400 lg:block">Admin</span>
                </div>
                <ul className='space-y-2 tracking-wide mt-8'>
                    {
                        menuItems.map((item, index) => (
                            <SideBarItem key={index} icon={item.icon} title={item.title} path={item.path} />
                        ))
                    }
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                    <CiLogout />
                    <span className="group-hover:text-gray-700">Logout</span>
                </button>
            </div>
        </aside>
    )
}

export default SideBar