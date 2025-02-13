import React, { useContext, useEffect, useState } from 'react'
import style from "./Cart.module.css"
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function Cart() {

  let {getLoggedUserCart , updateCartProductQuantity , deleteCartItem ,  numberItems, setnumberItems} = useContext(CartContext)
 const[CartDetails , setCartDetails] = useState(null)

  async function getCartItems(){
   let response = await getLoggedUserCart()
   if(response.data.status == "success"){
    setCartDetails(response.data.data)
    console.log(response.data.data);
    
   }
  }


  async function updateProduct(id , count){

if(count == 0){
  deleteItem(id)
}
else{
  let response = await updateCartProductQuantity(id , count)
  if(response.data.status == "success"){
   setCartDetails(response.data.data)
   toast.success("product updated successfully")
  }
  else{
    toast.error("error")
  }
 }
}

 
   async function deleteItem(productId){
    let response = await deleteCartItem(productId)
    console.log(response);
    
    if(response.data.status == "success"){
      setnumberItems(numberItems - 1)
      setCartDetails(response.data.data)
      toast.success("product removed successfully")
    }
  
   }

useEffect(()=>{
  getCartItems()
},[])

  return  <>
  {CartDetails?.products.length > 0 ? <>
<h2 className='text-center text-2xl text-blue-600 font-bold my-4 capitalize'>total price:{CartDetails?.totalCartPrice}</h2>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {CartDetails?.products.map((product)=><tr key={product.product.id} className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-500 dark:hover:bg-gray-600">
         <td className="p-4">
           <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
         </td>
         <td className="px-6 py-4 font-semibold text-gray-200 dark:text-white">
           {product.product.title}
         </td>
         <td className="px-6 py-4">
           <div className="flex items-center">
             <button onClick={()=>updateProduct(product.product.id ,product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-gray-300 border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
               <span className="sr-only">Quantity button</span>
               <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
               </svg>
             </button>
             <div>
               <span className='text-gray-200'>{product.count}</span>
             </div>
             <button onClick={()=>updateProduct(product.product.id ,product.count + 1 )} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-gray-300 border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
               <span className="sr-only">Quantity button</span>
               <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
               </svg>
             </button>
           </div>
         </td>
         <td className="px-6 py-4 font-semibold text-gray-200 dark:text-white">
           ${product.price}
         </td>
         <td className="px-6 py-4">
           <span onClick={()=>deleteItem(product.product.id)} className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
         </td>
       </tr>)}
    </tbody>
  </table>
  <Link to={'/checkout'}>
  <button className='btn my-3'>Checkout</button>
  </Link>
  
</div>

</> : <h1 className='text-3xl capitalize text-red-800 font-bold my-8 text-center'>there no items to show</h1>}


   </>
  
}
