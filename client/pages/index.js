import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { GlobalState } from '../components/GlobalState';
import { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert'

import Router from 'next/router';
import axios from 'axios';

import Tabledata from '../components/Tabledata';
const initialState={
    email:''
}

export default function Home() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    const [data]= state.User.datain
    const [callback,setCallback]= state.User.callback

    const [loaded,setLoaded] = useState(false)
    const [sendEmail,setsendEmail] = useState(initialState) 


    const handleChangeInput=e=>{
        const {name,value}=e.target
        setsendEmail({...sendEmail,[name]:value})
    }
    
    const handleSubmit=async e=>{
        e.preventDefault()
        try{
             await axios.post('/api/sendEmail',{...sendEmail})
             swal({icon:"success",text:`You have Send this Email ${sendEmail.email}`,timer:"2000",buttons: false}); 
             
        }catch(err){
         swal({
             title:"ERROR",
             text: err.response.data.msg,
             icon:"error",
             button:"OK"
         })
        }
     }

/*     useEffect(() => { if (!islogged ) { Router.push('/login') } else{ setLoaded(true) }},[]);
    if (!loaded) { return <div></div> } */
   
     useEffect(() => {
        if(!islogged) {
          let timerFunc = setTimeout(() => {
            Router.push('/login')
          }, 100);
    
          return () => clearTimeout(timerFunc);
      }else{ 
          setLoaded(true) 
        }
    }, [!islogged]);

    if (!loaded) { return <div></div> }

  return (
    <>
      <div className="card" >
        <div className="card-body">
          <h5 className="card-title">Send a New Form: </h5>
          <h6 className="card-subtitle mb-2 text-muted">Type Email of User Then Press Send</h6>
          <form  onSubmit={handleSubmit}>
           <Form.Group className="mb-3"  >
                  <Form.Control name="email" className="form-control-lg ubuntu"
                   type="email" placeholder="Type Email" onChange={handleChangeInput} />
            </Form.Group>
             <button variant="warning" type="submit" className="buttonCard"  >
                <div  className="iconSee">
                    <FontAwesomeIcon icon={faPaperPlane }/>
                </div>
                <div className="textIndex">
                    <b>Send</b>
                </div>
            </button> 
            </form>
        </div>
      </div><br/>
       
      <div className="tablecard"> 
        <div  className="optionsMenu"><b>USER WITH CORRECT DATA</b></div>
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="headerTable">
                  <tr>
                            <th> Name</th>
                            <th> Email</th>
                            <th> Address</th>
                            <th> Age</th>
                            <th> Date</th>
                            </tr> 
                        </thead>
                        <tbody >
                        {
                        data.map(data =>{
                            return <Tabledata key={data._id} data={data} />
                            })
                        }
                  </tbody>
              </table>
          </div>
      </div> 
    </>
  )
}

