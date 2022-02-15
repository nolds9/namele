import React from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Game } from "../components/Game";

const Main = () => {
  return (
    <div className="flex bg-white-100 font-sans items-center flex-col justify-between h-screen">
      <Header />
      <Game />
      <Footer />
    </div>
  );
};

export default Main;
