import Canvas from "./components/Canvas";
import SubmitButton from "./components/SubmitButton";

const App = () => {
  return (
    <div className="relative w-full min-h-screen">
      <div className="bg-white">
        <Canvas />
      </div>
      <SubmitButton />
    </div>
  );
};

export default App;
