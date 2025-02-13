import { createContext } from "react";


 export let CounterContext = createContext()

 export default function CounterContextProvider(){




    return <CounterContext.Provider value={{data}}>

    </CounterContext.Provider>
 }