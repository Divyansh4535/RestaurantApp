"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import InputText from '../Components/Input/InputText'
import Button from '../Components/Input/Button'

const Signup = () => {
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
    if (!checkValidValue()) return null;
    try {
      let res = await fetch("http://localhost:3000/api/restaurant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, city, address, contact, name })
      })
      let response = await res.json()
      console.info("API response :", response);
      if (response.success) {
        console.log("Response success is true. Checking result...");
        let { result } = response
        delete result.password
        localStorage.setItem("RestaurantUser", JSON.stringify(result))
        router.push("/restaurant/dashboard")
        console.log("result : -", result);

      } else {
        console.log("Sign up failed:", response.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  }
  return (
    <div className="flex flex-col  items-center gap-5 h-full w-full  ">
      <form onSubmit={handleSubmit} className="flex py-5 items-center h-full w-full gap-5 flex-col">
        <div className="relative w-[50%]">
          <InputText value={name} onChange={(e) => { setError(prev => ({ ...prev, name: "" })); setName(e.target.value) }} Type="text" Name="Enter Restaurant Name " />
          {error?.name && <span className="text-xs text-red-500 font-light absolute">  {error.name || ""} </span>}
        </div>
        <div className="relative w-[50%]">
          <InputText value={email} onChange={(e) => {
            setEmail(e.target.value);
            setError(prev => ({ ...prev, email: "" }));
          }} Type="email" Name="Email" Placeholder="example@gmail.com" />
          {error?.email && <span className="text-xs text-red-500 font-light absolute">{error.email || ""}</span>}
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
        <Button Name="Sign Up" ClassName="mt-5" />
      </form>
    </div>
  )
}

export default Signup