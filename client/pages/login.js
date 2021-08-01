import { Button,Form } from 'react-bootstrap'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { GlobalState } from '../components/GlobalState'
import Router from 'next/router';
import swal from 'sweetalert'

function Login() {
    const initialState={
        email:'',
        password:'',
    }

    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [login,setLogin] = useState(initialState)

    const handleChangeInput=e=>{
        const {name,value}=e.target
        setLogin({...login,[name]:value})
    }

    const handleSubmit= async e=>{
        e.preventDefault()
       try{
           await axios.post('/api/login',{...login})
           localStorage.setItem('firstLogin',true)
            swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
                window.location.href="/";
            },2000)

       }catch(err){
        swal({
            title:"ERROR",
            text: err.response.data.msg,
            icon:"error",
            button:"OK"
        })
       }
    }
    if(islogged) { Router.push('/') }
    return (
        <div className="limiter" >
            <div className="container-login100">
                <div className="wrap-login100">
            <form className="login100-form " onSubmit={handleSubmit}>
                <span className="login100-form-title p-b-43">Login to continue</span>
                <Form.Group className="mb-3" >
                    <Form.Label className="ubuntu">Email</Form.Label>
                    <Form.Control onChange={handleChangeInput} name="email" className="form-control-lg ubuntu" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3 ">
                    <Form.Label className="ubuntu">Password</Form.Label>
                    <Form.Control onChange={handleChangeInput} name="password" className="form-control-lg ubuntu" type="password" placeholder="Password" autoComplete="on"/>
                </Form.Group>

                <div className="container-login100-form-btn">
                    <button className="login100-form-btn ubuntu">
                    Login
                    </button>
                </div>

            <div className="text-center p-t-46 ">
                <Link href="/register">  
                   
                    <a className="txt2">or Register</a>
                  
                </Link>
            </div>
            
            </form>
            <div className="login100-more" />
                </div>
            </div>
        </div>
    )
}

export default Login
