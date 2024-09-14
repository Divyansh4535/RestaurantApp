"use client"
import React, { useState } from 'react'
import InputText from '../Components/Input/InputText'
import Button from '../Components/Input/Button'
import { useRouter } from 'next/navigation'
// import { Button } from '@/components/ui/button'

const UserSignUp = ({ login, setLogin }, props) => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [address, setAddress] = useState("")
  const [contact, setContact] = useState("")
  const [error, setError] = useState({
    email: "",
    contact: "",
    password: "",
    cPassword: "",
    name: "",
    city: "",
    address: "",
  })

  const checkValidValue = () => {
    let isValid = true;
    if (email === "") {
      setError(prev => ({ ...prev, email: "Email value is required!" }));
      isValid = false;
    } else if (!email.includes("@")) {
      setError(prev => ({ ...prev, email: "Enter a valid email!" }));
      isValid = false;
    }
    if (name === "") {
      setError(prev => ({ ...prev, name: "Name value is required!" }));
      isValid = false;
    }
    if (city === "") {
      setError(prev => ({ ...prev, city: " city  value is required!" }));
      isValid = false;
    }
    if (address === "") {
      setError(prev => ({ ...prev, address: "Address value is required!" }));
      isValid = false;
    }

    if (contact === "") {
      setError(prev => ({ ...prev, contact: "Contact value is required!" }));
      isValid = false;
    } else if (contact.length !== 10) {
      setError(prev => ({ ...prev, contact: "Contact value should be only 10 digits!" }));
      isValid = false;
    }
    if (password !== cPassword) {
      // setError(prev => ({ ...prev, password: "confirm Password  is does not matched " }))
      setError(prev => ({ ...prev, cPassword: "confirm Password is not match " }))
      isValid = false;
    } else if (password === "") {
      setError(prev => ({ ...prev, password: "Password value is required " }))
      isValid = false;
    }
    if (cPassword === "") {
      setError(prev => ({ ...prev, cPassword: " Confirm Password value is required " }))
      isValid = false;
    }
    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(' name, email, password, city, address, contact', name, email, password, city, address, contact)
    console.log(" ****************1*****************");
    if (!checkValidValue()) return
    let response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, city, address, contact })
    })
    console.log(" ****************2*****************");
    response = await response.json()
    console.log('response :---->', response)
    if (response.success) {
      const { result } = response;
      delete result.password
      localStorage.setItem('user', JSON.stringify(result))
      if (props?.redirect?.order) {
        router.push("/order")
      } else {
        router.push("/")
      }
      // alert("User Sign Up successfully ")
    } else {
      alert("User Sign Up Unsuccessfully ")
    }
    setEmail("")
    setPassword("")
    setCPassword("")
    setName("")
    setCity("")
    setAddress("")
    setContact("")
    setError({})

  }

  return (
    <div className="flex bg-slate-800 flex-col h-[calc(100vh-10vh)]  w-full  items-center p-5 gap-5 ">
      <h2 className="text-2xl font-bold text-white " > User SignUp </h2>
      <form onSubmit={handleSubmit} className="flex w-[50vw] bg-slate-100   rounded-lg shadow-lg overflow-y-auto shadow-black no-scrollbar py-5 h-[70vh]  items-center  gap-5 flex-col">
        <div className="relative w-[50%]">
          <InputText value={name} onChange={(e) => { setError(prev => ({ ...prev, name: "" })); setName(e.target.value) }} Name="Name" />
          {error?.name && <span className="text-xs text-red-500 font-light absolute">  {error.name || ""} </span>}
        </div>
        <div className="relative w-[50%]" >
          <InputText value={email} onChange={(e) => {
            setEmail(e.target.value);
            setError(prev => ({ ...prev, email: "" }));
          }} Type="text" Name="Email" Placeholder="example@gmail.com" />
          {error?.email && <span className="text-xs  text-red-500 font-light absolute">{error.email || ""}</span>}
        </div>
        <div className="relative w-[50%]">
          <InputText value={password} onChange={(e) => { setError(prev => ({ ...prev, password: "" })); setPassword(e.target.value) }} Type="password" Name="Password" />
          {error?.password && <span className="text-xs text-red-500 font-light absolute">  {error.password || ""} </span>}
        </div>
        <div className="relative w-[50%]">
          <InputText value={cPassword} onChange={(e) => { setError(prev => ({ ...prev, cPassword: "" })); setCPassword(e.target.value) }} Type="password" Name="Confirm Password" />
          {error?.cPassword && <span className="text-xs text-red-500 font-light absolute">  {error.cPassword || ""} </span>}
        </div>
        <div className="relative w-[50%]">
          <InputText value={city} onChange={(e) => { setError(prev => ({ ...prev, city: "" })); setCity(e.target.value) }} Name="Enter City  " />
          {error?.city && <span className="text-xs text-red-500 font-light absolute">  {error.city || ""} </span>}
        </div>
        <div className="relative w-[50%]">
          <InputText value={address} onChange={(e) => { setError(prev => ({ ...prev, address: "" })); setAddress(e.target.value) }} Name="Enter Full Address " />
          {error?.address && <span className="text-xs text-red-500 font-light absolute">  {error.address || ""} </span>}
        </div>
        <div className="relative w-[50%]">
          <InputText value={contact} onChange={(e) => { setError(prev => ({ ...prev, contact: "" })); setContact(e.target.value) }} Name="Enter Contact Number " Type="number" />
          <span className="text-xs text-red-500 font-light absolute">{error.contact || ""}</span>
        </div>
        <Button Type="submit" Name="Sign Up" ClassName="mt-5"> Sign Up</Button>
      </form>
      <h1 className="cursor-pointer text-white hover:text-blue-500 " onClick={() => setLogin(!login)}>Already have a account ? login</h1>
    </div>
  )
}

export default UserSignUp