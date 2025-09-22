import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage";
import TopNav from "./Components/Nav/TopNav";
import ProductFeaturesPage from "./Pages/ProductFeaturesPage";
import BottomNav from "./Components/Nav/BottomNav";

function App() {
  const [bgColor, setBgColor] = useState("#ffadad"); // default bg color

  useEffect(() => {
    const colors = [
      "#ffadad",
      "#ffd6a5",
      "#fdffb6",
      "#caffbf",
      "#9bf6ff",
      "#bdb2ff",
      "#ffc6ff",
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const colorIndex = Math.floor(scrollY / 200) % colors.length;
      setBgColor(colors[colorIndex]);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply background color directly to body
  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
  }, [bgColor]);

  return (
    <>
      <div style={{ backgroundColor: bgColor, minHeight: "200vh" }}>
        <TopNav />
        <HomePage />
        <ProductFeaturesPage />
        <BottomNav />
      </div>
    </>
  );
}

export default App;
