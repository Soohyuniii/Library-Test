import * as fabric from "fabric";

import { useEffect, useRef } from "react";

type Props = {
  physicalData: string;
};

const PhysicalCanvas = ({ physicalData }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadCanvasFromJson = (canvas: fabric.Canvas | null) => {
    canvas
      ?.loadFromJSON(physicalData)
      .then((canvas) => canvas.requestRenderAll());
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 1000,
        height: 500,
      });

      canvas.clear();
      loadCanvasFromJson(canvas);

      return () => {
        canvas.dispose();
      };
    }
  });

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
};

export default PhysicalCanvas;
