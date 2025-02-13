import React, { useEffect, useState } from 'react'
import style from "./Allorders.module.css"
import axios from 'axios'


export default function Allorders() {
 const[UserData , setuserData] = useState([])

  function GetUserOrder(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders`)
     .then((res)=> {
      setuserData(res.data.data)
console.log(res.data.data);

      return res
     })
     .catch((err)=> err)
  }

  useEffect(()=>{
    GetUserOrder()
    document.title="Allorders"
  },[])
  return (
   <>
 <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
      <tr>
       
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          City
        </th>
        <th scope="col" className="px-6 py-3">
        Total Price
        </th>
    
      </tr>
    </thead>
    <tbody>
    {UserData?.map((p)=><tr  className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-500 dark:hover:bg-gray-600">

         <td className="px-6 py-4 font-semibold text-gray-200 dark:text-white">
{p.user.name}
         </td>
        
         <td className="px-6 py-4">
           <span className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">{p.shippingAddress?.city}</span>
         </td>
         <td className="px-6 py-4 font-semibold text-gray-200 dark:text-white">
           ${p.totalOrderPrice}
         </td>
       </tr>)}
    </tbody>
  </table>
 
   
  
   
  
   </>
  )
}
