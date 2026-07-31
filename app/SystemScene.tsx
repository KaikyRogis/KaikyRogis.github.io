"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Line,
  OrbitControls,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function createNetworkPoints() {
  const positions = new Float32Array(270);
  let seed = 21;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = (random() - 0.5) * 9;
    positions[i + 1] = (random() - 0.5) * 7;
    positions[i + 2] = (random() - 0.5) * 4;
  }
  return positions;
}

const NETWORK_POINTS = createNetworkPoints();

function Network() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.025;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.08,
      0.03,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.12,
      0.02,
    );
  });

  return (
    <group ref={group}>
      <Points positions={NETWORK_POINTS} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#00d9ff"
          size={0.026}
          sizeAttenuation
          depthWrite={false}
          opacity={0.72}
        />
      </Points>
      <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.45}>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial
            color="#00d9ff"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>
        <mesh scale={0.62}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#30e88a"
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>
      <Line
        points={[
          [-3, -1, 0],
          [-1, 1.2, -0.5],
          [1.2, 0.4, 0.5],
          [3, 1.8, 0],
        ]}
        color="#00d9ff"
        lineWidth={0.55}
        transparent
        opacity={0.38}
      />
      <Line
        points={[
          [-2.5, 1.8, -1],
          [-0.8, -1.5, 0],
          [1.8, -1, -0.3],
          [3.2, 0.2, 0],
        ]}
        color="#30e88a"
        lineWidth={0.4}
        transparent
        opacity={0.25}
      />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.25, 0.005, 8, 180]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[Math.PI / 2.7, 0.3, 0.4]}>
        <torusGeometry args={[2.75, 0.004, 8, 180]} />
        <meshBasicMaterial color="#30e88a" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

export default function SystemScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 44 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Network />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.18}
      />
    </Canvas>
  );
}
