"use client"
import React from 'react'
import Login from '../_components/Login'
import Signup from '../_components/Signup'
import { useState } from 'react'
import Link from 'next/link'
import RestaurantHeader from '../_components/RestaurantHeader'
import RestaurantFooter from '../_components/RestaurantFooter'

const page = () => {
    const [login, setLogin] = useState(true)

    return (
        <div className="bg-gradient-to-br from-teal-700 to-cyan-600 h-screen w-full grid place-items-center ">
            <RestaurantHeader/>
            <h1 className="text-2xl font-bold text-white "> Restaurant Login & Sign Up Page </h1>
            <div className=" bg-slate-300 rounded-lg shadow-lg  shadow-black grid place-items-center h-[500px] w-[500px]  overflow-y-auto no-scrollbar py-5 " >
                {login ?
                    <Login />
                    : <Signup />
                }
            <p onClick={() => setLogin(!login)} className="hover:text-blue-700 cursor-pointer p-2 ">  {login ? "Already have Account ? Sign Up" : "do not have Account ? Login "} </p>
            </div>

            <RestaurantFooter />
        </div>
    )
}

export default page