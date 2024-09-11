"use client"
import Button from '@/app/Components/Input/Button'
import InputText from '@/app/Components/Input/InputText'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const UpdateFoodItem = (props) => {
    const id = props.params.id
    console.log('props.params.id :- ', props.params.id)
    const route = useRouter()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [path, setPath] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(false)

    const handleLoadFoodItem = async () => {
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + id)
        response = await response.json()
        console.log('response', response)
        if (response.success) {
            console.log('response.result', response.result)
            setName(response.result.name)
            setPrice(response.result.price)
            setPath(response.result.path)
            setDescription(response.result.description)
        }
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault()
        if (!name || !price || !path || !description) {
            setError(true)
            return false
        } else {
            setError(false)
        }
        console.log('name ,price , path, description', name, price ,  path,  description)
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + id ,{
            method:"PUT",
            body:JSON.stringify({name,price,path,description})
        })
        response = await response.json()

        if (response.success) {
            alert("product Item updated successfully")
            route.push("../dashboard")
        }else{
            alert("Data is not updated successfully ")
        }
    
    }

    useEffect(() => {
        handleLoadFoodItem()
    }, [])

    return (
        <div className="w-full items-center justify-start flex flex-col gap-5 py-5  h-full ">
            <h1 className="text-3xl font-bold capitalize text-slate-900" >Update Food Item</h1>
            <form onSubmit={handleUpdateSubmit} className="flex  flex-col gap-7 " >
                <div className="relative">
                    <InputText Name="Update Product Name" Placeholder="update Product Item  " value={name} onChange={(e) => setName(e.target.value)} ClassName="w-96 h-15" />
                    {error && !name && <span className="absolute py-1 text-sm text-red-700 font-medium">  Enter valid name</span>}
                </div>
                <div className="relative">
                    <InputText Name="Update Product item Price " Type="number" Placeholder="Update Product Item price  " value={price} onChange={(e) => setPrice(e.target.value)} ClassName="w-96 h-15" />
                    {error && !price && <span className="absolute py-1 text-sm text-red-700 font-medium">  Enter valid price</span>}
                </div>
                <div className="relative">
                    <InputText ClassName="w-96 h-15" Name="Update Product Item Image Path" Placeholder="Enter Product item Path  " value={path} onChange={(e) => setPath(e.target.value)} />
                    {error && !path && <span className="absolute py-1 text-sm text-red-700 font-medium">  Enter valid  Image path</span>}
                </div>
                <div className="relative">
                    <InputText Name=" Update Product Item Description" ClassName="w-96 h-15" Placeholder="Update Product item description  " value={description} onChange={(e) => setDescription(e.target.value)} />
                    {error && !description && <span className="absolute py-1 text-sm text-red-700 font-medium">  Enter valid description</span>}
                </div>
                <div className=" flex items-center gap-2 ">
                    <Button Name="Update Product Item" ClassName="mt-2" />
                    <Button Name="Back To Dashboard Page" OnClick={() => route.push("../dashboard")} ClassName="mt-2" />
                </div>
            </form>
        </div>
    )
}

export default UpdateFoodItem