import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { GlobalState } from '../components/GlobalState'
import Router from 'next/router';
import swal from 'sweetalert'
import axios from 'axios';

const initialState={
    name:'',
    email:'',
    password:'',
    repeat:''
}

function Register() {
    const [register,setRegister] = useState(initialState)
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    
    const handleChangeInput=e=>{
        const {name,value}=e.target
        setRegister({...register,[name]:value})
    }  

    const handleSubmit=async e=>{
        e.preventDefault()
        try{
             await axios.post('/api/register',{...register})
             localStorage.setItem('firstLogin',true) 
             swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
                 window.location.href="/";
             },2000)
             
        }catch(err){
         swal({
             title:"ERROR",
             text:err.response.data.msg,
             icon:"error",
             button:"OK"
         })
        }
        
     }
    if(islogged) { Router.push('/') }

    return (
        <div className="limiter" >
            <div className="container-register100">
                <div className="wrap-register100">
            <form className="register100-form "  onSubmit={handleSubmit} method="POST" >
                 <span className="register100-form-title p-b-43">Register to Send Forms</span>
                <Form.Group className="mb-3" >
                    <Form.Label className="ubuntu">Email</Form.Label>
                    <Form.Control  name ="email" onChange={handleChangeInput}  className="form-control-lg ubuntu" type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label className="ubuntu">Name</Form.Label>
                    <Form.Control name="name" onChange={handleChangeInput} className="form-control-lg ubuntu" type="text" placeholder="Enter Name" />
                </Form.Group>

                <Form.Group className="mb-3 ">
                    <Form.Label className="ubuntu">Password</Form.Label>
                    <Form.Control name="password" onChange={handleChangeInput} className="form-control-lg ubuntu" type="password" placeholder="Password" autoComplete="on"/>
                </Form.Group>

                <Form.Group className="mb-3 ">
                    <Form.Label className="ubuntu">Repeat Password</Form.Label>
                    <Form.Control name="repeat" onChange={handleChangeInput} className="form-control-lg ubuntu" type="password" placeholder="Repeat Password" autoComplete="on"/>
                </Form.Group>


                <div className="container-register100-form-btn">
                    <button className="register100-form-btn ubuntu">
                    register
                    </button>
                </div>

            <div className="text-center p-t-46 ">
                <Link href="/login">  
                    <a className="txt2">or Login</a>
                </Link>
            </div> 
            
            </form> 
            <div className="register100-more" />
                </div>
            </div>
        </div>
    )
}

export default Register
