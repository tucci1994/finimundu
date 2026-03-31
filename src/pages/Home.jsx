import React from "react";
import Hero from "../components/home/HeroSection";

function Home({ onSplashDone }) {
  return <Hero onSplashDone={onSplashDone} />;
}

export default Home;