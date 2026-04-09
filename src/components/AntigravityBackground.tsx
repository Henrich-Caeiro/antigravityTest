import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShapes = () => {
  const count = 50;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Generate random positions, rotations, and scales for the shapes
  const { positions, rotations, scales, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const rotations = new Float32Array(count * 3);
    const scales = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10; // z
      
      rotations[i * 3] = Math.random() * Math.PI;
      rotations[i * 3 + 1] = Math.random() * Math.PI;
      rotations[i * 3 + 2] = Math.random() * Math.PI;
      
      const scale = Math.random() * 0.5 + 0.1;
      scales[i * 3] = scale;
      scales[i * 3 + 1] = scale;
      scales[i * 3 + 2] = scale;
      
      speeds[i] = Math.random() * 0.02 + 0.005; // upward speed
    }
    return { positions, rotations, scales, speeds };
  }, [count]);

  const tempObject = new THREE.Object3D();

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Slight mouse interaction
    const mouseX = (state.pointer.x * state.viewport.width) / 50;
    const mouseY = (state.pointer.y * state.viewport.height) / 50;

    for (let i = 0; i < count; i++) {
      // Float up
      let y = positions[i * 3 + 1] + time * speeds[i] * 20;
      // Reset if it goes too high
      if (y > 15) {
        positions[i * 3 + 1] = -15 - (y - 15);
        y = positions[i * 3 + 1];
      }

      tempObject.position.set(
        positions[i * 3] + mouseX * (scales[i * 3] * 2),
        y - mouseY * (scales[i * 3] * 2),
        positions[i * 3 + 2]
      );
      tempObject.rotation.set(
        rotations[i * 3] + time * 0.2,
        rotations[i * 3 + 1] + time * 0.3,
        rotations[i * 3 + 2] + time * 0.1
      );
      tempObject.scale.set(scales[i * 3], scales[i * 3 + 1], scales[i * 3 + 2]);
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color="#7d5fff" 
        wireframe 
        transparent 
        opacity={0.3} 
        emissive="#5a32fa"
        emissiveIntensity={0.5}
      />
    </instancedMesh>
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#a0a0ff" />
      <pointLight position={[-10, -10, -5]} intensity={2} color="#5a32fa" />
    </>
  );
};

const MouseFollower = () => {
  const { camera } = useThree();
  useFrame(({ pointer }) => {
    // Subtle camera sway
    camera.position.x += (pointer.x * 2 - camera.position.x) * 0.05;
    camera.position.y += (-pointer.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

export default function AntigravityBackground() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <color attach="background" args={['#030305']} />
        <fog attach="fog" args={['#030305', 5, 25]} />
        <Lights />
        <MouseFollower />
        <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
          <FloatingShapes />
        </Float>
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={200} scale={20} size={2} speed={0.4} opacity={0.2} color="#a0a0ff" />
      </Canvas>
    </div>
  );
}
