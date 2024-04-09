import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="bg-black">
        <Hero />
        <Highlights />
      </main>
    </>
  );
};

export default App;
