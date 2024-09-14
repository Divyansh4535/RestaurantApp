"use client"
import React, { useState } from 'react'
import InputText from '../Components/Input/InputText'
import Button from '../Components/Input/Button'
import { Textarea } from "@/components/ui/textarea"

const AddFoodItem = () => {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [path, setPath] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !price || !path || !description) {
            setError(true)
            return false
        } else {
            setError(false)
        }
        let restaurantId;
        const restData = JSON.parse(localStorage.getItem("RestaurantUser"))
        console.log('restData :- ', restData)
        if (restData) {
            restaurantId = restData._id
        }
        console.log('restaurantId :- ', restaurantId)
        let res = await fetch("http://localhost:3000/api/restaurant/foods", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, price, path, description, restaurantId })
        })
        let response = await res.json()
        console.log("**************1******************");
        console.log('response ', response)
        if (response.success) {
            alert("food Item added")
        } else {
            alert("food does not added")
        }
        setPath("")
        setName("")
        setPrice("")
        setDescription("")
    }
    return (
        <div className="w-full bg-slate-900 items-center  justify-center flex flex-col gap-5  h-full    ">
            <h1 className="text-3xl font-semibold text-white" >Add Food Item</h1>
            <form onSubmit={handleSubmit} className="flex  items-center justify-center  w-full flex-col gap-7 " >
                <div className="relative w-[50%]"
                >
                    <InputText Name="Product Name" Placeholder="Enter Product Item  " value={name} onChange={(e) => setName(e.target.value)} ClassName="w-96  h-15" CL="text-white" />
                    {error && !name && <span className="absolute text-sm text-red-700 font-medium"> please enter valid name</span>}
                </div>
                <div className="relative w-[50%]">
                    <InputText CL="text-white" Name="Product Item Price " Type="number" Placeholder="Enter Product Item price  " value={price} onChange={(e) => setPrice(e.target.value)} ClassName="w-96 h-15" />
                    {error && !price && <span className="absolute text-sm text-red-700 font-medium"> please enter valid price</span>}
                </div>
                <div className="relative w-[50%]">
                    <InputText ClassName="w-96 h-15" CL="text-white" Name="Product Item Path" Placeholder="Enter Product Item Path  " value={path} onChange={(e) => setPath(e.target.value)} />
                    {error && !path && <span className="absolute text-sm text-red-700 font-medium"> please enter valid  img path</span>}
                </div>
                <div className="relative w-[50%]">
                    <InputText ClassName="w-96 h-15 " CL="text-white" Name="Product Item Description"  className="bg-white" value={description} Placeholder="Enter Product Item Description" onChange={(e) => setDescription(e.target.value)} />
                    {error && !description && <span className="absolute text-sm text-red-700 font-medium"> please enter valid description</span>}
                </div>
                <Button Name="Add Product Item" ClassName="mt-2" />
            </form>
        </div >
    )
}

export default AddFoodItem