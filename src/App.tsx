import React, { useEffect, useState } from "react";
import "./App.css";
import { FooterComponent } from "./component/FooterComponent/FooterComponent";
import { HeaderComponent } from "./component/HeaderComponent/HeaderComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AboutComponent } from "./component/AboutComponent/AboutComponent";
import { HomeComponent } from "./component/HomeComponent/HomeComponent";
import { PageNotFoundComponent } from "./component/PageNotFoundComponent/PageNotFoundComponent";

export function App() {
  return (
    <div className="container max-w-full flex flex-col h-screen">
      <BrowserRouter>
        <HeaderComponent></HeaderComponent>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/about" element={<AboutComponent />} />
          <Route path="*" element={<PageNotFoundComponent />} />
        </Routes>
        <FooterComponent></FooterComponent>
      </BrowserRouter>
    </div>
  );
}

export default App;
