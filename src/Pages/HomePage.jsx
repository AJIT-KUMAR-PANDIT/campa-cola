import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import modelUrl from "../assets/base_basic_shaded.glb";

// Model component with scale prop
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

  // GLB moves down on scroll
  const modelY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  // Text scales / moves closer on scroll
  const textSpacing = useTransform(scrollYProgress, [0, 1], [24, 8]); // margin px

  return (
    <div
      ref={ref}
      className="w-full h-full bg-[#952EA5] flex flex-col items-center justify-start"
    >
      {/* Heading row */}
      <div className="flex inset-0 items-center justify-center text-9xl font-bold text-gray-300 relative mt-20 w-full">
        <motion.span style={{ marginRight: textSpacing }}>Campa</motion.span>

        {/* GLB inline */}
        <motion.div
          style={{ y: modelY }}
          className="relative mx-6 mt-[20vh] h-[50vh]" // width 80vw, height 50vh
        >
          <Canvas
            camera={{ position: [0, 0, 10] }}
            style={{ background: "transparent", width: "100%", height: "100%" }}
          >
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 5]} intensity={1} />
            <Model scale={3} /> {/* scale the GLB itself */}
            <OrbitControls enableZoom={false} enablePan={false} enableRotate />
          </Canvas>
        </motion.div>

        <motion.span style={{ marginLeft: textSpacing }}>Cola</motion.span>
      </div>
    </div>
  );
}
