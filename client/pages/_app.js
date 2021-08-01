import Router from "next/router";
import React from "react";
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Loader from "../components/Loader"
import Header from "../components/Header"

import {useRouter} from 'next/router'
import { DataProvider } from '../components/GlobalState';



export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false);

  const showBarLogin = router.pathname === '/login'  ? true : false;
  const showBarRegister = router.pathname === '/register' ? true : false;

  const showForm = router.pathname === '/form' ? true : false;

  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);


  return (
    <>
    <DataProvider>
     <div className="main"> 
          {
            !showBarLogin && !showBarRegister && !showForm  && (<React.Fragment>
            <Header/>
            </React.Fragment>
            )
          }
          
        {
          loading ? (
            <Loader/>
          ) : (<React.Fragment>
          <div  className={!showBarLogin && !showBarRegister ? "content-wrap" : ""}>
            <Component {...pageProps} />
          </div>
            </React.Fragment>

          )
          
        }
      
       </div> 
    </DataProvider>
  </>
  );
}
