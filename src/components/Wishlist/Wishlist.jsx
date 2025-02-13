import React, { useContext, useEffect, useState } from 'react'
import style from "./Wishlist.module.css"
import { WishContext } from '../../Context/WishContext'
import axios from 'axios'



export default function Wishlist() {
 
  let {getLoggedUserWishlist} = useContext(WishContext)
 const[WishListProducts , setWishListProducts] = useState([])
 const[numberItems , setnumberItems] = useState(0)
 let headers = {
  token: localStorage.getItem("userToken")
}



  async function getWishItems(){
    let response = await getLoggedUserWishlist()
    if(response.data.status == "success"){
      setWishListProducts(response.data.data)
      console.log(response.data.data);
     }
    
   }


   function deleteWishItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
     .then((res)=> {
      setnumberItems(numberItems - 1)
      document.getElementById('remove').classList.add('invisible');
      return res
     })
     .catch((err)=> err)
  }


   useEffect(()=>{
    getWishItems()
   },[])
   

  return (
   <>
   <h1 className='text-3xl capitalize  font-bold my-8 '>My wish List</h1>
{WishListProducts.map((p)=><div id='remove' className='bg-slate-200 border-solid border-2 border-y-cyan-800'> 
  <div className='mx-11  p-2 flex items-center'>
    <img className='w-full  md:max-w-36' src={p.imageCover} alt="" />
    <div className='mx-10 '>
    <div className='my-2 text-[1.25rem]'>{p.brand.name}</div>
    <span className='text-green-600 font-bold'>{p.price} EGY</span>
    <p  onClick={()=>deleteWishItem(p._id)} className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</p>
    </div>
  </div>
  
</div>
)}
   </>
  )
}
