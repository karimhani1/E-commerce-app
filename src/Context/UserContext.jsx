import { useEffect, useState } from "react";
import { createContext } from "react";


 export let UserContext = createContext()

 export default function UserContextProvider(props){

  const [UserLogin , setUserLogin] = useState(null);

useEffect(()=>{
if(localStorage.getItem("userToken")){
setUserLogin(localStorage.getItem("userToken"))
}
}, [])

    return <UserContext.Provider value={{ UserLogin , setUserLogin}}>
       {props.children}
    </UserContext.Provider>
 }