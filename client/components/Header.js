import Head from 'next/head'
import React, { useContext } from 'react'
import { Container, Navbar,Nav,Image } from 'react-bootstrap'

import Link from 'next/link'
import { GlobalState } from './GlobalState';
import axios from 'axios';
import swal from 'sweetalert';

function Header() {
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged

    const logoutUser = async()=>{
        await axios.get('/api/logout')
          localStorage.removeItem('firstLogin')
          swal({icon:"success",text:"Bye",timer:"2000"}).then(function(){
            window.location.href="/";
        },2000)
    }

    const userLogged = () => {
        return (
          <>
            <React.Fragment>&nbsp;
                <button className="headerPosition"  >
                    <Link  href="/form">
                            <a className="aStyle">See User Form</a>
                    </Link>
                </button>
                <button className="headerPosition"  onClick={logoutUser}>
                    <a className="aStyle" >Log out</a>
                </button>
            </React.Fragment>
          </>
        )
      }

    return (
        <>
        <Head>
          <title >Antonio Test</title>
          <meta name="description" content="Test" />
          <link rel="icon" href="/logo2.png" />
        </Head>

        <Navbar className="borderHeader" bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand href="/">
                    <Image src="/logo2.png" width="70px" alt="Test" className="MagNet ubuntu"/>
                   TestForm
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse >
                <Nav>
                    { 
                      islogged ? userLogged():
                      (
                        <React.Fragment>
                    <Link className="headerPosition" href="/login">
                            <a className="aStyle">Login</a>
                    </Link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link className="headerPosition" href="/register">
                            <a className="aStyle">Register</a>
                    </Link>
                        </React.Fragment>
                      )  
                    }

                </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
