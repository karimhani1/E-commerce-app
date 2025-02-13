import React, { useEffect, useState } from 'react'
import style from "./Categories.module.css"
import axios from 'axios'



export default function Categories() {


  const [categories, setcategories] = useState([])
  


function getCategories(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then((res) => {
    setcategories(res.data.data)
    })
}

 useEffect(() => {
  getCategories()
  }, [])

  return (
   <>
   <div className='row gap-4'>
   { categories.length > 0 ? categories.map((category) => <div className=' mx-[30px] border-[2px] lg:w-1/4 '>
        <img src={category.image} className='w-full h-[300px] object-cover ' alt="" />
        <h3 className='text-center p-4 text-blue-800 text-2xl'>{category.name}</h3>
      </div>) : <div className='spinner'></div>}
   </div>
  

   </>
  )
}
