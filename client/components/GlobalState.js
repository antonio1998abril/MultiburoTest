import React, { createContext, useEffect, useState } from 'react'
import User from '../pages/api/User'
import Axios from 'axios'
import swal from 'sweetalert'
export const GlobalState = createContext()

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false)
    
    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken=async()=>{
                try{
                const res=await Axios.get('/api/refresh_token')      
                setToken(res.data.accesstoken)
    
                setTimeout(()=>{
                    refreshToken()
                },10 * 60 * 1000)
            } catch (err) {
                swal({
                    title:"ERROR",
                    text:err.response.data.msg,
                    icon:"error",
                    button:"OK"
                })
                localStorage.removeItem('firstLogin')
            }
            }
            refreshToken()
        }
    },[])

    const state = {
        token:[token,setToken],
        User:User(token),
    }

    return (
        <GlobalState.Provider value = {state}>
            {children}
        </GlobalState.Provider>
        )
}
