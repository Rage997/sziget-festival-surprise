import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ThreeFireworks from './ThreeFireworks';
import ThreeBalloons from './ThreeBalloons';
import CamperVan from './CamperVan';

interface ThreeBackgroundProps {
  showFireworks?: boolean;
  showBalloons?: boolean;
  showCamper?: boolean;
  fireworksIntensity?: 'burst' | 'normal' | 'ambient';
}

// Simplified animated background
function AnimatedSphere() {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(800 * 3);
    const colors = new Float32Array(800 * 3);

    for (let i = 0; i < 800; i++) {
      const radius = Math.random() * 4 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const hue = (i / 800) * 360;
      const color = new THREE.Color(`hsl(${hue}, 70%, 60%)`);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [positions, colors]);

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingGeometry({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.015;
      ref.current.rotation.z += 0.005;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.08]} />
      <meshStandardMaterial
        color="#FFD700"
        transparent
        opacity={0.6}
        emissive="#FFD700"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function Scene({ showFireworks, showBalloons, showCamper, fireworksIntensity }: ThreeBackgroundProps) {
  console.log('Scene rendering with props:', { showFireworks, showBalloons, showCamper, fireworksIntensity });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4ECDC4" />
      <pointLight position={[0, 10, -10]} intensity={0.3} color="#FF6B6B" />

      {/* Background animation */}
      <AnimatedSphere />

      {/* Floating decorative elements */}
      <FloatingGeometry position={[-2, 1, 0]} />
      <FloatingGeometry position={[2, -1, -1]} />
      <FloatingGeometry position={[0, 2, -2]} />
      <FloatingGeometry position={[-1, -2, 1]} />
      <FloatingGeometry position={[3, 0, 0]} />
      <FloatingGeometry position={[-3, 1, 2]} />

      {/* Conditional 3D elements */}
      <ThreeFireworks isActive={showFireworks || false} intensity={fireworksIntensity} />
      <ThreeBalloons isActive={showBalloons || false} />
      <CamperVan isActive={showCamper || false} />
    </>
  );
}

export default function ThreeBackground({ 
  showFireworks = false, 
  showBalloons = false, 
  showCamper = false,
  fireworksIntensity = 'normal'
}: ThreeBackgroundProps) {
  console.log('ThreeBackground props:', { showFireworks, showBalloons, showCamper, fireworksIntensity });

  return (
    <div 
      className="fixed inset-0" 
      style={{ 
        zIndex: 50, 
        pointerEvents: 'none',
        touchAction: 'none',
        userSelect: 'none'
      }}
    >
      <Canvas
        camera={{ 
          position: [0, 0, 8], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false
        }}
        dpr={[1, 2]}
        style={{ 
          pointerEvents: 'none',
          touchAction: 'none'
        }}
        onCreated={(state) => {
          console.log('Canvas created successfully!', state);
          state.gl.setClearColor('#000000', 0);
          // Ensure the canvas doesn't capture events
          state.gl.domElement.style.pointerEvents = 'none';
          state.gl.domElement.style.touchAction = 'none';
        }}
        onError={(error) => {
          console.error('Canvas error:', error);
        }}
      >
        <Suspense fallback={null}>
          <Scene
            showFireworks={showFireworks}
            showBalloons={showBalloons}
            showCamper={showCamper}
            fireworksIntensity={fireworksIntensity}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}