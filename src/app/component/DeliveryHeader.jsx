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
        <div className='bg-background/100  sticky  backdrop-blur border-b-2 flex items-center justify-between w-full h-16  '>
            <div className="p-4 h-16 justify-between  w-full flex items-center ">
                <div className="flex items-center gap-2">
                    <img src="../../../Assets/log.jpg" className="size-12" alt="Logo" />
                    <h1 className="text-lg font-bold ">TastyTrails</h1>
                </div>
                <div className="flex gap-5 font-semibold ">
                    <Link href="/" > Home </Link>
                    <Link href="/restaurant" > Add Restaurant  </Link>
                    
                </div>
            </div>
        </div>


    )
}

export default DeliveryHeader;