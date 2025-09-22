import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { Suspense, useState, useRef, useEffect } from "react";

import modelUrl from "../assets/1.glb";

function Model({ scale = 1 }) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={scale} />;
}
useGLTF.preload(modelUrl);

export default function HomePage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // GLB moves down
  const modelY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Text spacing decreases as GLB moves down
  const textSpacing = useTransform(scrollYProgress, [0, 1], [24, 8]);

  // Background color animates on scroll
  // const bgColor = useTransform(
  //   scrollYProgress,
  //   [0, 0.5, 1],
  //   ["#952EA5", "#4A90E2", "#F5A623"]
  // );

  // Light positions (dynamic)
  const lightLeftX = useTransform(scrollYProgress, [0, 1], [-10, -5]);
  const lightRightX = useTransform(scrollYProgress, [0, 1], [10, 5]);

  const [isInteracting, setIsInteracting] = useState(false);
  const isInteractingRef = useRef(isInteracting);

  useEffect(() => {
    isInteractingRef.current = isInteracting;
  }, [isInteracting]);

  const pointerDownPos = useRef({ x: 0, y: 0 });
  const isPointerDown = useRef(false);
  const interactionTimer = useRef(null);
  const controlsRef = useRef(null); // Add this ref for OrbitControls

  const startInteractionTimer = () => {
    if (interactionTimer.current) {
      clearTimeout(interactionTimer.current);
    }
    interactionTimer.current = setTimeout(() => {
      if (controlsRef.current) {
        controlsRef.current.reset(); // Reset camera view
      }
      setIsInteracting(false);
    }, 1000); // Change to 1 seconds
  };

  const stopInteractionTimer = () => {
    if (interactionTimer.current) {
      clearTimeout(interactionTimer.current);
      interactionTimer.current = null;
    }
  };

  return (
    <motion.div
      ref={ref}
      className="w-full h-[121vh] flex flex-col items-center justify-start bg-transparent"
    >
      {/* Heading row */}
      <div className=" flex flex-col lg:flex-row inset-0 items-center justify-center text-9xl font-bold text-gray-300 relative mt-20 w-full z-0">
        <motion.span
          style={{ marginRight: textSpacing }}
          className="text-7xl lg:text-9xl"
        >
          Ajit
        </motion.span>

        {/* GLB inline */}
        <motion.div
          style={{ y: modelY }}
          className="relative mx-6 mt-10 h-screen w-full max-w-lg z-10 touch-action-pan-y"
          onPointerDown={(e) => {
            isPointerDown.current = true;
            pointerDownPos.current = { x: e.clientX, y: e.clientY };
            stopInteractionTimer(); // Stop timer on new interaction
          }}
          onPointerUp={() => {
            isPointerDown.current = false;
            startInteractionTimer(); // Start timer when interaction ends
          }}
          onPointerLeave={() => {
            isPointerDown.current = false;
            startInteractionTimer(); // Start timer when interaction ends
          }}
          onPointerMove={(e) => {
            if (isPointerDown.current) {
              const dx = Math.abs(e.clientX - pointerDownPos.current.x);
              const dy = Math.abs(e.clientY - pointerDownPos.current.y);

              if (dx > 20 || dy > 20) {
                setIsInteracting(true);
                e.preventDefault(); // Prevent default only when interaction starts
              } else if (isInteractingRef.current) {
                e.preventDefault(); // Continue preventing default if already interacting
              }
            }
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 10] }}
            style={{ background: "transparent", width: "100%", height: "100%" }}
          >
            {/* Lights */}
            <motion.pointLight
              position={[lightLeftX, 5, 10]}
              intensity={1}
              color="white"
            />
            <motion.pointLight
              position={[lightRightX, 5, 10]}
              intensity={1}
              color="white"
            />
            <ambientLight intensity={0.5} />

            {/* 3D Model */}
            <Model scale={3} />

            <OrbitControls ref={controlsRef} enabled={isInteracting} />
          </Canvas>
        </motion.div>

        <motion.span style={{ marginLeft: textSpacing }}>Cola</motion.span>
      </div>
    </motion.div>
  );
}
