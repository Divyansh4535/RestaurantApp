"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const RestaurantHeader = ({ setAddItem, setLogin, login }) => {
  const [details, setDetails] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const userData = localStorage.getItem("RestaurantUser")
    if (!userData && pathname == "/restaurant/dashboard") {
      router.push("/restaurant")
    } else if (userData && pathname == "/restaurant") {
      router.push("/restaurant/dashboard")
    } else {
      setDetails(JSON.parse(userData))
    }

  }, [])

  const Logout = () => {
    localStorage.removeItem("RestaurantUser")
    router.push("/restaurant")
  }
  return (
    <>
      <div className='bg-background/100  sticky  backdrop-blur border-b flex items-center justify-between w-full h-16'  >
        <div className=" p-4 h-full justify-between  w-full flex items-center ">
          <div className="flex items-center gap-2">
            <img src="../../../Assets/log.jpg" className="size-12" alt="Logo" />
            <h1 className="text-lg font-bold ">TastyTrails</h1>
          </div>
          <nav className=" w-[60vw]  flex items-center justify-end  ">
            <ul className="md:flex items-center justify-around  hidden ">
              {
                details ?
                  <div className="flex items-center  w-[30vw] justify-between ">
                    <li className="cursor-pointer text-lg font-medium "><Link href="/">  Home</Link></li>
                    <li className="cursor-pointer text-lg font-medium " onClick={() => setAddItem(true)} ><Link href="#">  Add Food </Link></li>
                    <li className="cursor-pointer text-lg font-medium " onClick={() => setAddItem(false)}><Link href="#">  Dashboard</Link></li>
                    <li className="cursor-pointer text-lg font-medium "><Link href="/restaurant"> Profile</Link></li>
                    <li className="cursor-pointer text-lg font-medium rounded-full p-2 bg-blue-200 hover:bg-blue-100 " onClick={Logout} >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                      </svg>

                    </li>
                  </div>
                  :
                  <div className="flex items-center  w-[25vw] gap-10 ">
                    <li className="cursor-pointer text-lg font-medium "><Link href="/">  Home </Link></li>
                    <li className="cursor-pointer text-lg flex gap-3 font-medium ">
                      <Button onClick={() => setLogin(true)}> <Link href="/restaurant" > LogIn </Link> </Button>
                      <Button onClick={() => setLogin(false)}> <Link href="/restaurant" > SignUp</Link> </Button>
                    </li>
                  </div>
              }
            </ul>
          </nav>
          <div className="md:hidden gap-5 flex cursor-pointer">
            <Sheet>
              <SheetTrigger>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                </svg>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="flex items-center ">
                    <img src="../../../Assets/log.jpg" className="size-16" alt="Logo" />
                    <h1>TastyTrails</h1>
                  </SheetTitle>
                  <SheetDescription>
                    <nav className="flex items-center justify-start gap-5   ">
                      <ul className="flex flex-col  text-cyan-900 items-center justify-around  ">
                        {
                          details ?
                            <div className="flex flex-col items-center  w-[30vw] justify-between ">
                              <li className="cursor-pointer text-lg font-medium "><Link href="/" className="active:text-blue-600 underline-slate-800 hover:underline ">  Home</Link></li>
                              <li className="cursor-pointer text-lg font-medium " onClick={() => setAddItem(true)} ><Link className="active:text-blue-600 underline-slate-800 hover:underline " href="#">  Add Food </Link></li>
                              <li className="cursor-pointer  text-lg font-medium " onClick={() => setAddItem(false)}><Link className="active:text-blue-600 underline-slate-800 hover:underline " href="#">  Dashboard</Link></li>
                              <li className="cursor-pointer   text-lg  font-medium "><Link href="/restaurant" className="active:text-blue-600 underline-slate-800 hover:underline "> Profile</Link></li>
                            </div>
                            :
                            <div className="flex items-center  w-[25vw] gap-10 ">
                              <li className="cursor-pointer text-lg font-medium hover:underline"><Link href="/">  Home </Link></li>
                              <li className=" cursor-pointer text-lg flex gap-3 font-medium ">
                                <Button onClick={() => setLogin(true)}> <Link href="/restaurant" > LogIn </Link> </Button>
                                <Button onClick={() => setLogin(false)}> <Link href="/restaurant" > SignUp</Link> </Button>
                              </li>
                            </div>
                        }
                      </ul>
                    </nav>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
            <div className="cursor-pointer text-lg font-medium rounded-full p-2 bg-blue-200 hover:bg-blue-100 " onClick={Logout} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RestaurantHeader;