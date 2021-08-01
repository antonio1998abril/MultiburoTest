import  { useEffect, useState } from 'react'
import Axios from 'axios'
import swal from 'sweetalert'

function User(token) {
    const [isLogged,setIsLogged] = useState(false)
    const [perfilInfo, setPerfilInfo] = useState([])

    const [datain,setDatain]=useState([])
    const [callback,setCallback] = useState(false);
    useEffect(() => {
        if(token){
            const getUser = async () => {
                try{
                    const res = await Axios.get('/api/info',{
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    setPerfilInfo(res.data)
                } catch (err) {
                    
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
    },[token]);


    useEffect(()=>{
        if(token){
        const getUser =async()=>{
             const res= await Axios.get("/api/infoForm",{
                headers: {Authorization: token}
             })
             setDatain(res.data)
        }
        getUser()
    }
    },[token,callback]) 

    return {
        isLogged:[isLogged,setIsLogged],
        perfilInfo:[perfilInfo,setPerfilInfo],
        datain:[datain,setDatain],
        callback:[callback,setCallback]
    }
}

export default User
