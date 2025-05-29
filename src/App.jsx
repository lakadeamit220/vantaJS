import VantaGlobe from "./components/VantaGlobe";
import VantaNet from "./components/VantaNet";

function App() {
  return (
    <>
      {/* <VantaGlobe/> */}
      <VantaNet
        color="#ff3366" // Pink nodes
        backgroundColor="#001122" // Dark blue background
        // points={20} // More nodes
        // maxDistance={30} // Longer connections
        // spacing={15} // Closer spacing
        // showDots={false} // Hide the dots
        // showLines={true} // Show only the lines
        // color="#00ff88" // Bright teal lines
      >
        <h1 className="text-5xl font-bold text-pink-700 text-center py-5">
          VantaJS
        </h1>
      </VantaNet>
    </>
  );
}

export default App;
