import { useStateContext } from "../context/context";

const SubmitButton = () => {
  const { isSubmitActive } = useStateContext();

  const handleSubmit = () => {
    console.log("Create Image using server API");
  };

  return (
    <button
      className={`absolute bottom-10 left-1/2 -translate-x-1/2 px-12 py-4 bg-blue-500 text-white text-xl rounded-lg ${
        isSubmitActive ? "block" : "hidden"
      }`}
      onClick={handleSubmit}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
