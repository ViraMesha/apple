import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="bg-black">
        <Hero />
        <Highlights />
        <Model />
      </main>
    </>
  );
};

export default App;
