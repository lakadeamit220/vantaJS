import VantaGlobe from "./components/VantaGlobe";
import VantaNet from "./components/VantaNet";

function App() {
  return (
    <>
      {/* <VantaGlobe/> */}
      <VantaNet
        color="#ff3366" // Pink nodes
        backgroundColor="#001122" // Dark blue background
      >
        <h1 className="text-5xl font-bold text-red-600 text-center py-5">
          VantaJS
        </h1>
      </VantaNet>
    </>
  );
}

export default App;
