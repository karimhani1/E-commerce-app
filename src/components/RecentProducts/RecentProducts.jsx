import React, { useContext, useEffect, useState } from 'react'
import style from "./RecentProducts.module.css"
import  axios  from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import { WishContext } from '../../Context/WishContext';

export default function RecentProducts() {
const[products , setproducts] = useState([])
const[loading , setloading] = useState(false)
const[currentId , setcurrentId] = useState(0)
let {addProductToCard , numberItems, setnumberItems } = useContext(CartContext)
let {addProductToWishlist  } = useContext(WishContext)

async function addToWishlistCart(id){
  setcurrentId(id)
  setloading(true)
let response = await addProductToWishlist(id)
document.getElementById('color').classList.add('text-red-800');
console.log(response);
}

async function addToCart(id){
  setcurrentId(id)
  setloading(true)
let response = await addProductToCard(id)
console.log(response);

if(response.data.status == "success"){
  setnumberItems(numberItems + 1)
toast.success(response.data.message)
setloading(false)
}
else{
  toast.error(response.data.message)
  setloading(false)
}

}

function getProducts(){
  axios.get('https://ecommerce.routemisr.com/api/v1/products')
  .then((res)=>{
    console.log(res);
    
setproducts(res.data.data)

  })
  .catch((res)=>{})
}

useEffect(()=>{
  getProducts()
},[])

  return (
   <>
 <div className="row">
 { products.length > 0 ?  products.map((product)=> 
 <div key={product.id} className='w-full md:w-1/3 lg:w-1/4 xl:w-1/6'>
 
  <div className="product p-2">
  <Link to={`productdetails/${product.id}/${product.category.name}`}>
  <img src={product.imageCover} className='w-full' alt="" />
  <h3 className='text-emerald-600'>{product.category.name}</h3>
  <h3 className='font-semibold'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
  <div className='flex justify-between p-3'>
    <span>{product.price} EGP</span>
    <span><i className='fas fa-star text-yellow-400'></i> {product.ratingsAverage}</span>
   
  </div>
 
  <i id='color' onClick={()=>addToWishlistCart(product.id)} className='fa-solid fa-heart h3 mx-[80%] text-[28px] cursor-pointer'></i>

 
  </Link>
  <button onClick={()=>addToCart(product.id)} className='btn'>{loading && currentId == product.id? <i className='fas fa-spinner fa-spin'></i>: "Add To Cart"}</button>
  </div>

 </div>) :<div className='spinner'></div>}
 </div>
   </>
  )
}
