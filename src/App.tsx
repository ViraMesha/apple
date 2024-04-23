import Features from "./components/Features";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import HowItWorks from "./components/HowItWorks";
import Model from "./components/Model";
import Navbar from "./components/Navbar";

import * as Sentry from "@sentry/react";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="bg-black">
        <Hero />
        <Highlights />
        <Model />
        <Features />
        <HowItWorks />
      </main>
    </>
  );
};

export default Sentry.withProfiler(App);
