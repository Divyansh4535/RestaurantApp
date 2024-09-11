"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'


const RestaurantHeader = () => {
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
      <header className="flex text-white items-center w-[90%] h-10 px-5 justify-between ">
        <div className="cursor-pointer text-lg font-medium "> Logo </div>
        <nav className=" w-[30vw] ">
          <ul className="sm:flex items-center justify-around  hidden ">
            {
              details ?
              <div className="flex items-center  w-[30vw] justify-between ">
                  <li className="cursor-pointer text-lg font-medium "><Link href="/restaurant">  Home</Link></li>
                  <li className="cursor-pointer text-lg font-medium "><Link href="/restaurant"> Profile</Link></li>
                  <li className="cursor-pointer text-lg font-medium " onClick={Logout} > Logout</li>
                </div>
                :
                <div className="flex items-center  w-[25vw] justify-between ">
                <li className="cursor-pointer text-lg font-medium "><Link href="/restaurant">  Home</Link></li>
                <li className="cursor-pointer text-lg font-medium "><Link href="/restaurant"> Login / SignUp</Link></li>
                </div>
            }
          </ul>
        </nav>
      </header>
    </>
  )
}

export default RestaurantHeader;