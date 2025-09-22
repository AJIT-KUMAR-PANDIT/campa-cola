import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import modelUrl from "../assets/base_basic_shaded.glb";

function Model({ scale = 1 }) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={scale} />;
}
useGLTF.preload(modelUrl);

export default function HomePage() {
  const ref = useRef(null);

  // Track scroll progress
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

  return (
    <motion.div
      ref={ref}
      className="w-full h-[200vh] flex flex-col items-center justify-start bg-transparent"
    >
      {/* Heading row */}
      <div className=" flex flex-col lg:flex-row inset-0 items-center justify-center text-9xl font-bold text-gray-300 relative mt-20 w-full z-0">
        <motion.span
          style={{ marginRight: textSpacing }}
          className="text-7xl lg:text-9xl"
        >
          Campa
        </motion.span>

        {/* GLB inline */}
        <motion.div
          style={{ y: modelY }}
          className="relative mx-6 mt-[20vh] h-[100vh]  z-10"
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

            <OrbitControls enableZoom={false} enablePan={false} enableRotate />
          </Canvas>
        </motion.div>

        <motion.span style={{ marginLeft: textSpacing }}>Cola</motion.span>
      </div>
    </motion.div>
  );
}
