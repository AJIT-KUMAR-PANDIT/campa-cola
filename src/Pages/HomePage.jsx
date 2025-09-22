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

  // Light positions (dynamic)
  const lightLeftX = useTransform(scrollYProgress, [0, 1], [-10, -5]);
  const lightRightX = useTransform(scrollYProgress, [0, 1], [10, 5]);

  const [isRotating, setIsRotating] = useState(false);
  const isRotatingRef = useRef(isRotating);
  const [isHovered, setIsHovered] = useState(false); // New state for hover

  useEffect(() => {
    isRotatingRef.current = isRotating;
  }, [isRotating]);

  const pointerDownPos = useRef({ x: 0, y: 0 });
  const isPointerDown = useRef(false);
  const interactionTimer = useRef(null);
  const controlsRef = useRef(null);
  const canvasRef = useRef(null);
  const isDragging = useRef(false);

  const startInteractionTimer = () => {
    if (interactionTimer.current) {
      clearTimeout(interactionTimer.current);
    }
    interactionTimer.current = setTimeout(() => {
      if (controlsRef.current) {
        controlsRef.current.reset();
      }
      setIsRotating(false);
    }, 1000);
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
      className="w-full max-h-[121vh] flex flex-col items-center justify-start bg-transparent"
    >
      {/* Heading row */}
      <div className=" flex flex-col lg:flex-row inset-0 items-center justify-center text-9xl font-bold text-[#E92229] relative mt-20 w-full z-0">
        <motion.span
          style={{ marginRight: textSpacing }}
          className="text-7xl lg:text-9xl z-0 hidden lg:block"
        >
          AJIT
        </motion.span>

        <motion.span
          style={{ marginRight: textSpacing }}
          className="text-6xl  z-0 mt-10"
        >
          AJIT COLA
        </motion.span>

        {/* GLB inline */}
        <motion.div
          style={{ y: modelY }}
          className="relative mx-6 mt-10 h-screen w-full max-w-lg z-10"
        >
          <Canvas
            ref={canvasRef}
            camera={{ position: [0, 0, 10] }}
            style={{
              background: "transparent",
              width: "100%",
              height: "90vh",
              pointerEvents: "auto",
            }}
            onPointerDown={(e) => {
              isPointerDown.current = true;
              isDragging.current = false;
              pointerDownPos.current = { x: e.clientX, y: e.clientY };
              stopInteractionTimer();
            }}
            onPointerMove={(e) => {
              if (isPointerDown.current) {
                const dx = e.clientX - pointerDownPos.current.x;
                const dy = e.clientY - pointerDownPos.current.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance > 10 && !isDragging.current) {
                  // Determine if this is more horizontal (rotate) or vertical (scroll)
                  const isHorizontal = Math.abs(dx) > Math.abs(dy);

                  if (isHorizontal) {
                    // Horizontal movement - enable rotation and prevent scroll
                    isDragging.current = true;
                    setIsRotating(true);
                    e.preventDefault();
                    e.stopPropagation();
                  }
                  // Vertical movement - let scroll happen naturally
                } else if (isDragging.current) {
                  // Continue preventing scroll if already rotating
                  e.preventDefault();
                  e.stopPropagation();
                }
              }
            }}
            onPointerUp={() => {
              isPointerDown.current = false;
              isDragging.current = false;
              startInteractionTimer();
            }}
            onPointerLeave={() => {
              isPointerDown.current = false;
              isDragging.current = false;
              startInteractionTimer();
              setIsHovered(false); // Set hovered to false on leave
            }}
            onPointerEnter={() => {
              // New onPointerEnter event
              setIsHovered(true); // Set hovered to true on enter
              stopInteractionTimer();
            }}
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

            <OrbitControls
              ref={controlsRef}
              enabled={isRotating || isHovered} // Enable rotation on drag or hover
              enableZoom={true}
              enablePan={false}
              enableRotate={isRotating || isHovered} // Enable rotation on drag or hover
              enableDamping={true}
              dampingFactor={0.1}
            />
          </Canvas>
        </motion.div>

        <motion.span
          style={{ marginLeft: textSpacing }}
          className="z-0  hidden lg:block"
        >
          COLA
        </motion.span>
      </div>

      {/* Footer with moving tagline */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap py-2 bg-gray-800 text-white text-xl font-bold">
        <motion.span
          className="inline-block"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ ease: "linear", duration: 10, repeat: Infinity }}
        >
          India Ka Apna COLA &nbsp;&nbsp;&nbsp; India Ka Apna COLA
          &nbsp;&nbsp;&nbsp;
        </motion.span>
      </div>
    </motion.div>
  );
}
