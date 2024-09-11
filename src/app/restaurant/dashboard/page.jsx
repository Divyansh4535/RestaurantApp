"use client"
import React ,{ useState } from 'react'
import AddFoodItem from '@/app/_components/AddFoodItem'
import RestaurantFooter from '@/app/_components/RestaurantFooter'
import RestaurantHeader from '@/app/_components/RestaurantHeader'
import AddFoodItemList from '@/app/_components/AddFoodItemList'

const page = () => {
const [addItem, setAddItem] = useState(false)

    return (
        <>
            <div className="flex bg-gradient-to-br from-teal-700 to-cyan-600 flex-col  h-screen w-full ">
                <RestaurantHeader  />
                <div className="flex flex-col h-screen w-full ">
                    <div className="flex w-52 items-center justify-between ">
                        <button onClick={()=> setAddItem(true)} className="py-1 px-3 bg-blue-600 rounded-md "> Add Food</button>
                        <button onClick={()=> setAddItem(false)} className="py-1 px-3 bg-blue-600 rounded-md "> Dashboard </button>
                    </div>
                        {addItem ? <AddFoodItem/> : <AddFoodItemList />  }
                        
                </div>
                <RestaurantFooter />
            </div>
        </>
    )
}
export default page








