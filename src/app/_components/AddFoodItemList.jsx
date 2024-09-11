"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const AddFoodItemList = () => {
    const [foodItem, setFoodItem] = useState([])
    console.log('foodItem', foodItem)
    const router = useRouter()
    const LoadFoodItem = async () => {
        const restaurantData = JSON.parse(localStorage.getItem("RestaurantUser"))
        const restaurantId = restaurantData._id
        console.log('restaurantData -*- ', restaurantData)
        console.log('restaurantId -*- ', restaurantId)
        let response = await fetch("http://localhost:3000/api/restaurant/foods/" + restaurantId)
        response = await response.json()
        // console.log('response :- ', response )
        if (response.success) {
            // console.log('response.success  :- ', response.success)
            setFoodItem(response.result)
            // console.log('response.result', response.result)
        } else {
            alert("food item list not loaded")
        }
    }

    const DeleteItem = async (id) => {
        let response = await fetch("http://localhost:3000/api/restaurant/foods/" + id, {
            method: 'DELETE'
        });
        response = await response.json()
        if (response.success) {
            LoadFoodItem()
        } else {
            alert("food item not deleted")
        }
    }

    useEffect(() => {
        LoadFoodItem()
    }, [])

    return (
        <div className="flex items-center justify-start gap-3 h-full w-full flex-col ">
            <h1 className="text-2xl font-bold text-cyan-200 "> Food Item List </h1>
            <div className="no-scrollbar overflow-y-auto h-[80vh]">
                <table className=" border-2 border-black  w-[90vw] h-full bg-white ">
                    <thead className="h-16 bg-cyan-500">
                        <tr className="text-center border-b-2 border-black  ">
                            <th className="border-r-2 text-lg  border-black px-2 ">S.N</th>
                            <th className="border-r-2 text-lg  border-black px-2 "> Name </th>
                            <th className="border-r-2 text-lg  border-black px-2 "> Price</th>
                            <th className="border-r-2 text-lg  border-black px-2 "> Description </th>
                            <th className="border-r-2 text-lg  border-black px-2 ">  Image</th>
                            <th className="border-r-2 text-lg  border-black px-2 "> Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodItem.map((item, idx) => (
                            <tr key={idx} className="border-b text-center border-black" >
                                <td className="border-r-2 border-black px-2  font-semibold" >  {idx + 1}. </td>
                                <td className="border-r-2 border-black px-2 " >   {item.name} </td>
                                <td className="border-r-2 border-black px-2 " > &#8377;{item.price} </td>
                                <td className="border-r-2 border-black px-2 " > {item.description}  </td>
                                <td className="border-r-2 border-black px-2  h-fit" > <img src={item.path} alt={item.name} width={250} height={200} className="p-2" /> </td>
                                <td className="px-2" >
                                    <div className="size-full flex items-center justify-around">
                                        <button onClick={() => DeleteItem(item._id)}> ❌ </button>
                                        <button onClick={() => router.push("dashboard/" + item._id)}> 📝 </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AddFoodItemList