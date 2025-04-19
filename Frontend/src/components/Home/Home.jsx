import React, { useEffect } from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Main from "./Main";
import Service from "./Service";
import About from "./About";
import Info from "./Info";
import Process from "./Process";
import Pricing from "./Pricing";
import Contact from "./Contact";
import Form from "./Form";
import Footer from "./Footer";
import Opinion from "./Opinion";



const Home = () => {

  useEffect(()=>{
    window.scroll(0,0)

  },[])
  
  return (
    <div>
      <Header />
      <Navbar />
      <Main />
      <About />
      <Service />
      <Info />
      <Process />
      <Pricing />
      <Opinion />
      <Contact />
      <Form />
      <Footer />
      
    </div>
  );
};

export default Home;
