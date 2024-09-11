"use client"
import React, { useState } from 'react'
import InputText from '../Components/Input/InputText'
import Button from '../Components/Input/Button'
import { useRouter } from 'next/navigation'

const UserLogin = ({ login, setLogin },props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            setError(true)
            return false
        } else {
            setError(false)
        }
        try {
            let response = await fetch("http://localhost:3000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            response = await response.json()
            console.log('response user Login ;------- ', response)
            if (response.success) {
                const { result } = response
                delete result.password
                localStorage.setItem('user', JSON.stringify(result))
                alert("Login successfully ") 
                if(props?.redirect?.order) {
                    router.push("/order")
                } else{
                    router.push("./")
                }
            } else {
                alert("falied")
            }
        } catch (error) {
            console.error(error);
        }
        console.log('email,password', email, password)
        setEmail("")
        setPassword("")
    }

    return (
        <div className="flex bg-slate-200 flex-col h-[calc(100vh-5rem)]  w-full  items-center p-5 gap-5 ">
            <h2 className="text-2xl font-bold " > User Log In  </h2>
            <form onSubmit={handleSubmit} className="flex w-[50vw] bg-cyan-600   rounded-lg shadow-lg overflow-y-auto shadow-black no-scrollbar py-5 h-[70vh] items-center justify-center  gap-5 flex-col">
                <div className="relative w-[50%]">
                    <InputText Type="email" Name="Email" value={email} onChange={(e) => setEmail(e.target.value)} Placeholder="example@gmail.com" />
                    {error && !email && <span className="absolute text-xs text-red-500 font-light">Please Enter a valid email </span>}
                </div>
                <div className="relative mb-2 w-[50%]">
                    <InputText Type="password" Name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error && !password && <span className="absolute text-xs text-red-500 font-light">Please Enter a valid password </span>}
                </div>
                <Button Name="LogIn" Type="submit"/>
            </form>
            <p className="cursor-pointer hover:text-blue-500 " onClick={() => setLogin(!login)}>Do not have a account ? SignUp</p>
        </div>
    )
}


export default UserLogin