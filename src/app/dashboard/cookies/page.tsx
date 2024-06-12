import { TabBar } from "@/app/todos/components/TabBar"
import { cookies } from "next/headers"


export const metadata = {
    title: "Cookies",
    description: "Cookies page",
}

export default function CookiesPage() {
  const cookiStore = cookies()
  const cookieTab = cookiStore.get('currentTab')?.value ?? '1' // si no existe la cookie, se asigna el valor 1

 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col">
          {/* lo pasamos a number con el + */}
            <TabBar currentTab={+cookieTab}/> 
        </div>
        <span className="text-3xl">Tabs</span>

    </div>
  )
}

