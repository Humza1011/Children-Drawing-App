/* eslint-disable react/prop-types */
import { useState, createContext, useContext } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [canvasObject, setCanvasObject] = useState(null);
  const [isSubmitActive, setSubmitActive] = useState(false);

  const clearCanvas = () => {
    if (canvasObject) {
      canvasObject.clear();
    }
  };

  return (
    <StateContext.Provider
      value={{
        canvasObject,
        setCanvasObject,
        clearCanvas,
        isSubmitActive,
        setSubmitActive,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
