import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";


 export let WishContext = createContext()

 export default function WishContextProvider(props){

  const [WishLogin , setWishLogin] = useState([]);


  let headers = {
    token: localStorage.getItem("userToken")
}

function addProductToWishlist(productId){
return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {productId :productId,}

,{
    headers, 
    
})
.then((res)=> res)
.catch((err)=> err)
}


function getLoggedUserWishlist(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
     .then((res)=> {
         console.log(res);
         
         setWishLogin(res.data.data)
         return res
     })
     .catch((err)=> err)
 
 }


 useEffect(()=>{
    getLoggedUserWishlist()
},[])
    return <WishContext.Provider value={{ addProductToWishlist , getLoggedUserWishlist , WishLogin , setWishLogin }}>
       {props.children}
    </WishContext.Provider>
 }