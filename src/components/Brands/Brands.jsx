import React, { useEffect, useState } from 'react'
import style from "./Brands.module.css"
import axios from 'axios'

export default function Brands() {
const[brandItems , setbrandItems] = useState([])
const[brandId , setbrandId] = useState(0)

  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
     .then((res)=> { 
      console.log(res);
      
      setbrandItems(res.data.data)
     })
     .catch((err)=> err);
    
 }

function boxAlert(id){

  axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  .then((res) => {
    console.log(res);
    
    setbrandId(res.data.data._id)
  })
  .catch((err) => {err})
}



useEffect(()=>{
  getBrands()

},[])


  return (
     <>
  <h2 className='text-center text-4xl text-blue-600 font-bold my-4 capitalize'>All Brands</h2>
  <div className='row gap-3 '>  
    { brandItems.length > 0 ?  brandItems.map((brandItems)=> 
  <div className='border-[1px] py-6 mx-4 w-full md:w-1/3 lg:w-1/4 xl:w-1/5' onClick={()=> boxAlert(brandItems._id)}>
    <div className=" p-2">
<img className='w-full' src={brandItems.image} alt="" />
<h3 className='text-center text-[#212529]'>{brandItems.name}</h3>
    </div>
  </div>) : <div className='spinner'></div>}
  </div>



   </>
  )
}
