import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ThreeFireworksProps {
  isActive: boolean;
  intensity?: 'burst' | 'normal';
}

export default function ThreeFireworks({ isActive, intensity = 'normal' }: ThreeFireworksProps) {
  console.log('ThreeFireworks isActive:', isActive, 'intensity:', intensity);
  
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 3000;
  const lastFireworkTime = useRef(0);
  const burstStartTime = useRef(0);
  const isBursting = useRef(false);
  const continuousInterval = useRef<NodeJS.Timeout>();

  const { positions, colors, velocities, lifetimes, sizes } = useMemo(() => {
    console.log('Creating fireworks particles...');
    return {
      positions: new Float32Array(particleCount * 3),
      colors: new Float32Array(particleCount * 3),
      velocities: new Float32Array(particleCount * 3),
      lifetimes: new Float32Array(particleCount),
      sizes: new Float32Array(particleCount),
    };
  }, []);

  const activeFireworks = useRef<Array<{
    center: THREE.Vector3;
    startTime: number;
    color: THREE.Color;
    particleStart: number;
    particleCount: number;
    type: 'burst' | 'fountain' | 'spiral' | 'ring' | 'willow' | 'chrysanthemum' | 'peony';
    maxLifetime: number;
  }>>([]);

  const createFirework = (center: THREE.Vector3, color: THREE.Color, now: number, type: 'burst' | 'fountain' | 'spiral' | 'ring' | 'willow' | 'chrysanthemum' | 'peony' = 'burst') => {
    console.log('Creating', type, 'firework at:', center);
    const particleStart = Math.floor(Math.random() * (particleCount - 250));
    const fireworkParticleCount = type === 'fountain' ? 80 : type === 'chrysanthemum' ? 150 : 120 + Math.floor(Math.random() * 80);
    const maxLifetime = type === 'willow' ? 6 : type === 'fountain' ? 4 : type === 'chrysanthemum' ? 5 : 3.5;

    activeFireworks.current.push({
      center: center.clone(),
      startTime: now,
      color: color.clone(),
      particleStart,
      particleCount: fireworkParticleCount,
      type,
      maxLifetime,
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
        
        default: // burst
          phi = Math.random() * 2 * Math.PI;
          const burstCostheta = Math.random() * 2 - 1;
          theta = Math.acos(burstCostheta);
          speed = 2.5 + Math.random() * 4;
          break;
      }

      velocities[idx * 3 + 0] = speed * Math.sin(theta) * Math.cos(phi);
      velocities[idx * 3 + 1] = speed * Math.sin(theta) * Math.sin(phi);
      velocities[idx * 3 + 2] = speed * Math.cos(theta);

      if (type === 'willow') {
        velocities[idx * 3 + 1] *= 0.7;
      }

      colors[idx * 3 + 0] = color.r;
      colors[idx * 3 + 1] = color.g;
      colors[idx * 3 + 2] = color.b;

      lifetimes[idx] = 1.0;
      sizes[idx] = type === 'willow' ? 0.08 + Math.random() * 0.12 : 
                   type === 'chrysanthemum' ? 0.06 + Math.random() * 0.08 :
                   0.1 + Math.random() * 0.1;
    }
  };

  // Handle intensity changes (burst mode when button is clicked)
  useEffect(() => {
    if (!isActive) return;

    if (intensity === 'burst') {
      console.log('Starting fireworks burst!');
      burstStartTime.current = performance.now();
      isBursting.current = true;
      
      const colors = [
        new THREE.Color('#FF6B6B'), new THREE.Color('#4ECDC4'), new THREE.Color('#45B7D1'),
        new THREE.Color('#FFEAA7'), new THREE.Color('#DDA0DD'), new THREE.Color('#98D8C8'),
        new THREE.Color('#F7DC6F'), new THREE.Color('#BB8FCE'), new THREE.Color('#85C1E9'),
        new THREE.Color('#F8C471'), new THREE.Color('#82E0AA'), new THREE.Color('#AED6F1'),
        new THREE.Color('#FF69B4'), new THREE.Color('#00CED1'), new THREE.Color('#FFD700'),
        new THREE.Color('#FF4500'), new THREE.Color('#9370DB'), new THREE.Color('#32CD32'),
      ];

      const types: Array<'burst' | 'fountain' | 'spiral' | 'ring' | 'willow' | 'chrysanthemum' | 'peony'> = 
        ['burst', 'fountain', 'spiral', 'ring', 'willow', 'chrysanthemum', 'peony'];

      // Initial massive burst
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          const center = new THREE.Vector3(
            (Math.random() - 0.5) * 12,
            Math.random() * 5 + 1,
            (Math.random() - 0.5) * 10
          );
          const color = colors[Math.floor(Math.random() * colors.length)];
          const type = types[Math.floor(Math.random() * types.length)];
          createFirework(center, color, performance.now(), type);
        }, i * 120);
      }

      // Gradual reduction over 15 seconds
      const burstInterval = setInterval(() => {
        const elapsed = (performance.now() - burstStartTime.current) / 1000;
        
        if (elapsed > 15) {
          isBursting.current = false;
          clearInterval(burstInterval);
          return;
        }

        const frequency = 200 + (elapsed / 15) * 1300;
        
        if (performance.now() - lastFireworkTime.current > frequency) {
          const center = new THREE.Vector3(
            (Math.random() - 0.5) * 14,
            Math.random() * 6 + 1,
            (Math.random() - 0.5) * 12
          );
          const color = colors[Math.floor(Math.random() * colors.length)];
          const type = types[Math.floor(Math.random() * types.length)];
          createFirework(center, color, performance.now(), type);
          lastFireworkTime.current = performance.now();
        }
      }, 80);

      return () => clearInterval(burstInterval);
    }
  }, [intensity, isActive]);

  // CONTINUOUS fireworks that NEVER stop once activated
  useEffect(() => {
    if (!isActive) {
      activeFireworks.current = [];
      if (continuousInterval.current) {
        clearInterval(continuousInterval.current);
        continuousInterval.current = undefined;
      }
      return;
    }

    console.log('Starting CONTINUOUS fireworks that never stop!');

    const colors = [
      new THREE.Color('#FF6B6B'), new THREE.Color('#4ECDC4'), new THREE.Color('#45B7D1'),
      new THREE.Color('#FFEAA7'), new THREE.Color('#DDA0DD'), new THREE.Color('#98D8C8'),
      new THREE.Color('#F7DC6F'), new THREE.Color('#BB8FCE'), new THREE.Color('#85C1E9'),
      new THREE.Color('#FF69B4'), new THREE.Color('#00CED1'), new THREE.Color('#FFD700'),
      new THREE.Color('#FF4500'), new THREE.Color('#9370DB'), new THREE.Color('#32CD32'),
      new THREE.Color('#FF1493'), new THREE.Color('#00BFFF'), new THREE.Color('#FFA500'),
    ];

    const types: Array<'burst' | 'fountain' | 'spiral' | 'ring' | 'willow' | 'chrysanthemum' | 'peony'> = 
      ['burst', 'fountain', 'spiral', 'ring', 'willow', 'chrysanthemum', 'peony'];

    // Continuous fireworks that never stop!
    continuousInterval.current = setInterval(() => {
      // Only create new fireworks if we're not in burst mode and don't have too many active
      if (!isBursting.current && activeFireworks.current.length < 4) {
        const center = new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          Math.random() * 5 + 1,
          (Math.random() - 0.5) * 12
        );
        const color = colors[Math.floor(Math.random() * colors.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        createFirework(center, color, performance.now(), type);
      }
    }, 2000 + Math.random() * 2000); // Every 2-4 seconds

    // Cleanup function
    return () => {
      if (continuousInterval.current) {
        clearInterval(continuousInterval.current);
        continuousInterval.current = undefined;
      }
    };
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

        // Different physics for different firework types
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
        const sparkle = 0.7 + 0.3 * Math.sin(state.clock.elapsedTime * 12 + idx);
        
        colors[idx * 3 + 0] = fw.color.r * fade * sparkle;
        colors[idx * 3 + 1] = fw.color.g * fade * sparkle;
        colors[idx * 3 + 2] = fw.color.b * fade * sparkle;

        sizes[idx] = (0.08 + Math.random() * 0.12) * fade;
      }

      return true;
    });

    const geometry = pointsRef.current.geometry;
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
  });

  if (!isActive) {
    console.log('Fireworks not active, returning null');
    return null;
  }

  console.log('Rendering continuous fireworks');

  return (
    <points
      ref={pointsRef}
      frustumCulled={false}
      renderOrder={100}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        sizeAttenuation
        transparent
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}