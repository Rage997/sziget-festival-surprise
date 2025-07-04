import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface ThreeFireworksProps {
  isActive: boolean;
  intensity?: 'burst' | 'normal';
}

export default function ThreeFireworks({ isActive, intensity = 'normal' }: ThreeFireworksProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = useMemo(() => window.innerWidth < 768 ? 1500 : 3000, []);
  const lastFireworkTime = useRef(0);
  const burstStartTime = useRef(0);
  const isBursting = useRef(false);
  const continuousInterval = useRef<NodeJS.Timeout>();
  const sparkTexture = useLoader(THREE.TextureLoader, '/textures/fireworkTexture.png');
  const sound = useMemo(() => new Audio('/sounds/firework_pop.mp3'), []);

  const { positions, colors, velocities, lifetimes, sizes } = useMemo(() => {
    return {
      positions: new Float32Array(particleCount * 3),
      colors: new Float32Array(particleCount * 3),
      velocities: new Float32Array(particleCount * 3),
      lifetimes: new Float32Array(particleCount),
      sizes: new Float32Array(particleCount),
    };
  }, [particleCount]);

  const activeFireworks = useRef<Array<{
    center: THREE.Vector3;
    startTime: number;
    color: THREE.Color;
    particleStart: number;
    particleCount: number;
    type: string;
    maxLifetime: number;
  }>>([]);

  const fireworkTypes: Array<'burst' | 'fountain' | 'spiral' | 'ring' | 'willow' | 'chrysanthemum' | 'peony'> = [
    'burst', 'fountain', 'spiral', 'ring', 'willow', 'chrysanthemum', 'peony',
  ];

  const createFirework = (center: THREE.Vector3, color: THREE.Color, now: number, type: string = 'burst') => {
    const particleStart = Math.floor(Math.random() * (particleCount - 250));
    const isMobile = window.innerWidth < 768;
    const baseParticleCount = isMobile ? 60 : 120;
    const fireworkParticleCount = type === 'fountain' ? 
      (isMobile ? 40 : 80) : 
      type === 'chrysanthemum' ? 
        (isMobile ? 75 : 150) : 
        baseParticleCount + Math.floor(Math.random() * (isMobile ? 40 : 80));

    const maxLifetime = type === 'willow' ? 6 : type === 'fountain' ? 4 : type === 'chrysanthemum' ? 5 : 3.5;

    sound.currentTime = 0;
    // sound.play();

    activeFireworks.current.push({
      center: center.clone(),
      startTime: now,
      color: color.clone(),
      particleStart,
      particleCount: fireworkParticleCount,
      type,
      maxLifetime
    });

    for (let i = 0; i < fireworkParticleCount; i++) {
      const idx = particleStart + i;
      if (idx >= particleCount) break;

      positions[idx * 3 + 0] = center.x;
      positions[idx * 3 + 1] = center.y;
      positions[idx * 3 + 2] = center.z;

      let speed, phi, theta;

      switch (type) {
        case 'fountain':
          phi = Math.random() * 2 * Math.PI;
          theta = Math.PI * 0.25 + Math.random() * Math.PI * 0.15;
          speed = 1.5 + Math.random() * 2.5;
          break;
        case 'spiral':
          const spiralAngle = (i / fireworkParticleCount) * Math.PI * 6;
          phi = spiralAngle;
          theta = Math.PI * 0.4 + Math.random() * Math.PI * 0.2;
          speed = 2 + Math.random() * 3;
          break;
        case 'ring':
          phi = (i / fireworkParticleCount) * 2 * Math.PI;
          theta = Math.PI * 0.5 + (Math.random() - 0.5) * 0.15;
          speed = 2.5 + Math.random() * 1.5;
          break;
        case 'willow':
          phi = Math.random() * 2 * Math.PI;
          const costheta = Math.random() * 2 - 1;
          theta = Math.acos(costheta);
          speed = 1.2 + Math.random() * 2;
          break;
        case 'chrysanthemum':
          const layer = Math.floor(i / (fireworkParticleCount / 3));
          phi = (i % (fireworkParticleCount / 3)) / (fireworkParticleCount / 3) * 2 * Math.PI;
          theta = Math.PI * 0.3 + layer * Math.PI * 0.15;
          speed = 2 + layer * 0.8 + Math.random() * 1.5;
          break;
        case 'peony':
          phi = Math.random() * 2 * Math.PI;
          theta = Math.acos(Math.random() * 0.8 + 0.1);
          speed = 2.8 + Math.random() * 2.2;
          break;
        default:
          phi = Math.random() * 2 * Math.PI;
          const burstCostheta = Math.random() * 2 - 1;
          theta = Math.acos(burstCostheta);
          speed = 2.5 + Math.random() * 4;
          break;
      }

      velocities[idx * 3 + 0] = speed * Math.sin(theta) * Math.cos(phi);
      velocities[idx * 3 + 1] = speed * Math.sin(theta) * Math.sin(phi);
      velocities[idx * 3 + 2] = speed * Math.cos(theta);

      if (type === 'willow') velocities[idx * 3 + 1] *= 0.7;

      colors[idx * 3 + 0] = color.r;
      colors[idx * 3 + 1] = color.g;
      colors[idx * 3 + 2] = color.b;

      lifetimes[idx] = 1.0;
      const baseSize = isMobile ? 0.06 : 0.1;
      sizes[idx] = baseSize + Math.random() * baseSize;
    }
  };

  useEffect(() => {
    if (!isActive) return;
    const colorList = ['#FF6B6B', '#4ECDC4', '#FFEAA7', '#FFD700', '#FF69B4'];

    continuousInterval.current = setInterval(() => {
      const color = new THREE.Color(colorList[Math.floor(Math.random() * colorList.length)]);
      const center = new THREE.Vector3((Math.random() - 0.5) * 12, Math.random() * 5 + 1, (Math.random() - 0.5) * 10);
      const type = fireworkTypes[Math.floor(Math.random() * fireworkTypes.length)];
      createFirework(center, color, performance.now(), type);
    }, 2000);

    return () => clearInterval(continuousInterval.current);
  }, [isActive]);

  useFrame((state, delta) => {
    if (!isActive || !pointsRef.current) return;

    activeFireworks.current = activeFireworks.current.filter(fw => {
      const age = (state.clock.elapsedTime - fw.startTime / 1000);
      if (age > fw.maxLifetime) return false;

      for (let i = 0; i < fw.particleCount; i++) {
        const idx = fw.particleStart + i;
        if (idx >= particleCount) break;

        positions[idx * 3 + 0] += velocities[idx * 3 + 0] * delta;
        positions[idx * 3 + 1] += velocities[idx * 3 + 1] * delta;
        positions[idx * 3 + 2] += velocities[idx * 3 + 2] * delta;

        if (fw.type === 'willow') {
          velocities[idx * 3 + 1] -= 4 * delta;
          velocities[idx * 3 + 0] *= 0.995;
          velocities[idx * 3 + 2] *= 0.995;
        } else if (fw.type === 'fountain') {
          velocities[idx * 3 + 1] -= 6 * delta;
        } else if (fw.type === 'chrysanthemum') {
          velocities[idx * 3 + 1] -= 2.5 * delta;
          velocities[idx * 3 + 0] *= 0.998;
          velocities[idx * 3 + 2] *= 0.998;
        } else {
          velocities[idx * 3 + 1] -= 3.5 * delta;
        }

        const fade = Math.max(0, 1 - age / fw.maxLifetime);
        const sparkle = 0.7 + 0.3 * Math.sin(state.clock.elapsedTime * 12 + idx); // sparkle/growing effect

        colors[idx * 3 + 0] = fw.color.r * fade * sparkle;
        colors[idx * 3 + 1] = fw.color.g * fade * sparkle;
        colors[idx * 3 + 2] = fw.color.b * fade * sparkle;

        sizes[idx] = (0.1 + Math.sin(state.clock.elapsedTime * 20 + idx)) * fade;
      }

      return true;
    });

    const geometry = pointsRef.current.geometry;
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
  });

  if (!isActive) return null;

  return (
    <points ref={pointsRef} frustumCulled={false} renderOrder={100}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        map={sparkTexture}
        alphaTest={0.01}
        transparent
        size={0.15}
        sizeAttenuation
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
