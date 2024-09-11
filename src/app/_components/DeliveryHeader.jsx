"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'


const DeliveryHeader = () => {
    const [details, setDetails] = useState(null)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // const userData = localStorage.getItem("RestaurantUser")
        // if (!userData && pathname == "/restaurant/dashboard") {
        //   router.push("/restaurant")
        // } else if (userData && pathname == "/restaurant") {
        //   router.push("/restaurant/dashboard")
        // } else {
        //   setDetails(JSON.parse(userData))
        // }

    }, [])

    const Logout = () => {
        // localStorage.removeItem("RestaurantUser")
        // router.push("/restaurant")
    }

    return (
        <>
            <div className="bg-cyan-900 text-cyan-100 shadow-md shadow-cyan-100 h-20 w-full flex items-center ">
                <nav className='flex items-center justify-between w-full h-10 px-5 '>
                    <div> logo</div>
                    <div className="flex gap-5 font-semibold ">
                        <Link href="/" > Home </Link>
                        <Link href="/" > Add Restaurant  </Link>
                    </div>
                </nav>
            </div>

        </>
    )
}

export default DeliveryHeader;