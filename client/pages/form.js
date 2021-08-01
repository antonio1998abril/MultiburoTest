import axios from 'axios';
import React, { useState } from 'react'

import {Form,Button} from 'react-bootstrap';
import swal from 'sweetalert';
const initialState={
    email:'',
    name:'',
    address:'',
    age:'',
    rcfe:''
}

function FormUser() {
    const [inForm,setinForm] = useState(initialState)

    const handleChangeInput=e=>{
        const {name,value}=e.target
        setinForm({...inForm,[name]:value})
    }

    const handleSubmit= async e=>{
        e.preventDefault()
       try{
           await axios.post('/api/postForm',{...inForm})
            swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
                window.location.href="/form";
            },2000)

       }catch(err){
        swal({
            title:"Check your Email",
            text: err.response.data.msg,
            icon:"warning",
            button:"OK"
        })
       }
    }
    return (
    <>
    <div className="formU">
      <div className="card formU" >
            <div className="card-body">
            <h5 className="card-title register100-form-title ">Complete with all requeriments </h5>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <Form.Label className="ubuntu">Name:</Form.Label>
                        <Form.Control name="name" onChange={handleChangeInput} className="form-control-lm ubuntu" type="name" placeholder="Type Name" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label className="ubuntu">Email:</Form.Label>
                        <Form.Control name="email" onChange={handleChangeInput} className="form-control-lm ubuntu" type="email" placeholder="Type Email" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label className="ubuntu">RCF:</Form.Label>
                        <Form.Control name="rcfe" onChange={handleChangeInput} className="form-control-lm ubuntu" type="text" placeholder="Type RCFE" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label className="ubuntu">Address Complete:</Form.Label>
                        <Form.Control name="address" onChange={handleChangeInput} className="form-control-lm ubuntu" type="text" placeholder="Type Address" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label className="ubuntu">Age:</Form.Label>
                        <Form.Control name="age" onChange={handleChangeInput} className="form-control-lm ubuntu" type="text" placeholder="Type Age" />
                </Form.Group>
                <Button variant="warning" type="submit"><b>SEND</b></Button>
            </Form>
           

            </div>
        </div>
    </div>
    </>
    )
}

export default FormUser
