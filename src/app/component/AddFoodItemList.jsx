"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Loading from '../Components/Input/Loading'

const AddFoodItemList = () => {
    const [foodItem, setFoodItem] = useState([])
    const router = useRouter()

    const LoadFoodItem = async () => {
        try {
            const restaurantData = JSON.parse(localStorage.getItem("RestaurantUser"))
            if (!restaurantData) {
                alert("Restaurant data not found in local storage")
                return
            }
            const restaurantId = restaurantData._id
            let response = await fetch(`http://localhost:3000/api/restaurant/foods/${restaurantId}`)
            response = await response.json()
            if (response.success) {
                setFoodItem(response.result)
            } else {
                alert("Food item list not loaded")
            }
        } catch (error) {
            console.error("Error loading food items:", error)
            alert("An error occurred while loading food items")
        }
    }

    const DeleteItem = async (id) => {
        try {
            let response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`, {
                method: 'DELETE'
            })
            response = await response.json()
            if (response.success) {
                LoadFoodItem()
            } else {
                alert("Food item not deleted")
            }
        } catch (error) {
            console.error("Error deleting food item:", error)
            alert("An error occurred while deleting the food item")
        }
    }

    useEffect(() => {
        LoadFoodItem()
    }, [])

    return (
        <div className="flex items-center bg-slate-900 justify-start h-screen w-full flex-col ">
            <h1 className="text-2xl underline  font-bold text-white pt-2">Food Item List</h1>
            {foodItem.length > 0 ? (
                <div className="no-scrollbar px-4 text-white overflow-y-auto h-[80vh]">
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow className="text-lg font-semibold text-white">
                                <TableHead className="w-[100px]  text-white" >S.N</TableHead>
                                <TableHead className=" text-white">Name</TableHead>
                                <TableHead className=" text-white">Price</TableHead>
                                <TableHead className="text-right  text-white">Description</TableHead>
                                <TableHead className="text-right  text-white">Image</TableHead>
                                <TableHead className="text-right  text-white">Operations</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {foodItem.map((item, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="font-medium">{idx + 1}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>&#8377;{item.price}</TableCell>
                                    <TableCell className="text-right">{item.description}</TableCell>
                                    <TableCell>
                                        <img src={item.path} alt={item.name} width={250} height={200} className="p-2" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="size-full flex items-center justify-around">
                                            <button onClick={() => DeleteItem(item._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-red-800">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </button>
                                            <button onClick={() => router.push(`dashboard/${item._id}`)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-blue-700 size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (

                <Loading/>
            )}
        </div>
    )
}

export default AddFoodItemList
