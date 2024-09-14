"use client"
import React, { useEffect, useState } from 'react'
import CustomerHeader from '../component/CustomerHeader'
import RestaurantFooter from '../component/RestaurantFooter'

const page = () => {
  const [myOrder, setMyOrder] = useState([])
  console.log('myOrder', myOrder)
  console.log('myOrder', myOrder)

  useEffect(() => {
    getMyOrder()
  }, [])


  const getMyOrder = async () => {
    let userStorage = JSON.parse(localStorage.getItem('user'))
    let ID = userStorage._id
    console.log('ID :-------->', ID)
    let response = await fetch("http://localhost:3000/api/order?id=" + ID)
    response = await response.json()
    console.log('response:----------->', response)
    if (response.success) {
      setMyOrder(response.result)
    }
  }
  console.log('myOrder', myOrder)


  return (
    <div className="flex items-center flex-col h-screen w-full justify-between ">
      <CustomerHeader />
      <div className="w-full h-full bg-cyan-100 ">
        <h1 className="text-center text-2xl h-10 font-bold">My Profile</h1>
        <div className="flex gap-5 flex-wrap h-full w-full ">
          {myOrder?.map((item, idx) => {
              return <div key={idx} className="flex p-5 items-start justify-start flex-col bg-cyan-800 text-cyan-200 rounded-md w-72 h-36   ">
                <h3 className="capitalize ">Name : {item.data.name}</h3>
                <h3 className="capitalize ">Amount : {item.amount}</h3>
                <h3 className="capitalize ">address : {item.data.address}</h3>
                <h3 className="capitalize ">Status : {item.status}</h3>
              </div>
            })}
        </div>
      </div>
      <RestaurantFooter />
    </div>
  )
}

export default page