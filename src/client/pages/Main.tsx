import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Guesses } from "../components/Guesses";

const Main = () => {
  return (
    <div className="flex bg-white-100 font-sans items-center flex-col justify-between h-screen">
      <Header />
      <Guesses />
      <Footer />
    </div>
  );
};

export default Main;
