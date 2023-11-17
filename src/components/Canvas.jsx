import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../context/context";
import { fabric } from "fabric";

const Canvas = () => {
  const { setCanvasObject, setSubmitActive } = useStateContext();
  const canvasRef = useRef(null);
  const [drawnLength, setDrawnLength] = useState(0);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    activatePencil(canvas);

    canvas.on("path:created", (e) => {
      const pathLength = calculatePathLength(e.path);
      setDrawnLength((prevLength) => prevLength + pathLength);
    });

    const handleResize = () => {
      // Adjust canvas dimensions based on the window size
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      // Update the canvas size
      canvas.setDimensions({ width: newWidth, height: newHeight });
    };

    window.addEventListener("resize", handleResize);

    setCanvasObject(canvas);

    return () => {
      canvas.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (drawnLength >= 300) {
      setSubmitActive(true);
    }
  }, [drawnLength, setSubmitActive]);

  const activatePencil = (canvasObject) => {
    canvasObject.isDrawingMode = true;
    canvasObject.freeDrawingBrush = new fabric.PencilBrush(canvasObject);
    canvasObject.freeDrawingBrush.color = "#000000";
    canvasObject.freeDrawingBrush.width = 2;
  };

  const calculatePathLength = (path) => {
    let length = 0;
    const points = path.path;

    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];
      length += distanceBetweenPoints(p1, p2);
    }

    return length;
  };

  const distanceBetweenPoints = (point1, point2) => {
    const dx = point2[1] - point1[1];
    const dy = point2[2] - point1[2];
    return Math.sqrt(dx * dx + dy * dy);
  };

  return <canvas ref={canvasRef} />;
};

export default Canvas;
