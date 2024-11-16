import React from "react";
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

const Home = () => {
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
      <Contact />
      <Form />
      <Footer />
    </div>
  );
};

export default Home;
