"use client"
import React ,{ useState } from 'react'
import AddFoodItem from '@/app/component/AddFoodItem'
import RestaurantFooter from '@/app/component/RestaurantFooter'
import RestaurantHeader from '@/app/component/RestaurantHeader'
import AddFoodItemList from '@/app/component/AddFoodItemList'

const page = () => {
const [addItem, setAddItem] = useState(false)

    return (
        <>
            <div className="flex bg-gradient-to-br no-scrollbar overflow-y-auto from-teal-500 to-cyan-400 flex-col  h-screen w-full ">
                <RestaurantHeader setAddItem={setAddItem} />
                <div className="flex flex-col h-[calc(100%-10vh)]  w-full no-scrollbar overflow-y-auto">
                        {addItem ? <AddFoodItem/> : <AddFoodItemList />  }
                </div>
                {/* <RestaurantFooter /> */}
            </div>
        </>
    )
}
export default page








