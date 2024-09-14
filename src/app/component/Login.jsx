"use client"
import React, { useState } from 'react'
import InputText from '../Components/Input/InputText'
import Button from '../Components/Input/Button'
import { useRouter } from 'next/navigation'


const Login = () => {
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
    let res = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, login: true })
    })
    let response = await res.json()
    if (response.success) {
      let { result } = response;
      delete result.password
      localStorage.setItem("RestaurantUser", JSON.stringify(result))
      alert("Login done ")
      router.push("/restaurant/dashboard")
    } else {
      alert("Login failed")
    }
    setEmail("")
    setPassword("")
  }
  // console.log('email,password : ', email,password)
  return (
    <div className="flex items-center flex-col gap-5  w-full h-full ">
      <form className="flex items-center gap-6 w-full h-full flex-col justify-center" onSubmit={handleSubmit}>
        <div className="relative w-[50%]">
          <InputText Type="email" Name="Email" value={email} onChange={(e) => setEmail(e.target.value)} Placeholder="example@gmail.com" />
          {error && !email && <span className="absolute text-xs text-red-500 font-light">Please Enter a valid email </span>}
        </div>
        <div className="relative mb-2 w-[50%]">
          <InputText Type="password" Name="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && !password && <span className="absolute text-xs text-red-500 font-light">Please Enter a valid password </span>}
        </div>
        <Button Name="LogIn" />
      </form>
    </div>
  )
}


export default Login