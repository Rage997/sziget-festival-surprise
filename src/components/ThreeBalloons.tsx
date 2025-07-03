import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BalloonProps {
  position: [number, number, number];
  color: string;
  delay: number;
  size: number;
  startTime: number;
  id: number;
}

function Balloon({ position, color, delay, size, startTime, id }: BalloonProps) {
  const groupRef = useRef<THREE.Group>(null);
  const balloonRef = useRef<THREE.Mesh>(null);
  const stringRef = useRef<THREE.Mesh>(null);
  const currentCycle = useRef(0);

  // Ensure we have a valid color
  const validColor = useMemo(() => {
    try {
      const testColor = new THREE.Color(color);
      return color;
    } catch {
      console.warn(`Invalid color ${color} for balloon ${id}, using fallback`);
      return '#FF6B6B'; // Fallback color
    }
  }, [color, id]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Calculate time since this balloon should start
    const actualStartTime = startTime + delay * 1000;
    const currentTime = performance.now();
    
    // If it's too early for this balloon, hide it
    if (currentTime < actualStartTime) {
      groupRef.current.visible = false;
      return;
    }
    
    groupRef.current.visible = true;

    // Calculate progress for this cycle
    const cycleTime = (currentTime - actualStartTime) / 1000;
    const cycleDuration = 15;
    const progress = (cycleTime % cycleDuration) / cycleDuration;

    // Reset position at start of each cycle
    if (progress < 0.05 && currentCycle.current !== Math.floor(cycleTime / cycleDuration)) {
      currentCycle.current = Math.floor(cycleTime / cycleDuration);
      // Randomize starting position for variety
      position[0] = (Math.random() - 0.5) * 16;
      position[2] = (Math.random() - 0.5) * 12;
    }
    
    // Floating motion with gentle wind effects
    const windX = Math.sin(cycleTime * 0.3 + delay) * 1.2;
    const windZ = Math.cos(cycleTime * 0.2 + delay) * 0.8;
    const bobbing = Math.sin(cycleTime * 1.5 + delay) * 0.3;
    
    // Balloon rises continuously
    groupRef.current.position.y = position[1] + progress * 20 + bobbing;
    groupRef.current.position.x = position[0] + windX;
    groupRef.current.position.z = position[2] + windZ;

    // Gentle rotation
    groupRef.current.rotation.y = cycleTime * 0.15 + delay;

    // Balloon breathing effect (very subtle)
    if (balloonRef.current) {
      const breathe = 1 + Math.sin(cycleTime * 2 + delay) * 0.04;
      balloonRef.current.scale.setScalar(breathe);
    }

    // String physics - realistic swaying
    if (stringRef.current) {
      const stringSwayX = Math.sin(cycleTime * 1.2 + delay) * 0.2;
      const stringSwayZ = Math.cos(cycleTime * 0.9 + delay) * 0.15;
      stringRef.current.rotation.x = stringSwayX;
      stringRef.current.rotation.z = stringSwayZ;
    }

    // Fade out as balloon reaches the top, then reset
    const fadeStart = 0.85;
    if (progress > fadeStart) {
      const fadeProgress = (progress - fadeStart) / (1 - fadeStart);
      const opacity = Math.max(0.1, 1 - fadeProgress * 0.7); // Ensure minimum opacity
      groupRef.current.scale.setScalar(Math.max(0.3, 1 - fadeProgress * 0.3)); // Ensure minimum scale
      
      // Update material opacity safely
      if (balloonRef.current?.material && 'opacity' in balloonRef.current.material) {
        (balloonRef.current.material as THREE.MeshStandardMaterial).opacity = opacity;
      }
    } else {
      // Ensure full opacity when not fading
      if (balloonRef.current?.material && 'opacity' in balloonRef.current.material) {
        (balloonRef.current.material as THREE.MeshStandardMaterial).opacity = 0.9;
      }
      groupRef.current.scale.setScalar(1);
    }
  });

  // Create materials with error handling
  const balloonMaterial = useMemo(() => {
    try {
      return new THREE.MeshStandardMaterial({
        color: validColor,
        transparent: true,
        opacity: 0.9,
        roughness: 0.2,
        metalness: 0.1,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
        side: THREE.FrontSide, // Ensure proper rendering
      });
    } catch (error) {
      console.error(`Error creating balloon material for balloon ${id}:`, error);
      // Fallback material
      return new THREE.MeshStandardMaterial({
        color: '#FF6B6B',
        transparent: true,
        opacity: 0.9,
      });
    }
  }, [validColor, id]);

  const highlightMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.7,
      emissive: '#ffffff',
      emissiveIntensity: 0.2,
    });
  }, []);

  const stringMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#2C1810',
      roughness: 0.8,
    });
  }, []);

  const glowMaterial = useMemo(() => {
    try {
      return new THREE.MeshBasicMaterial({
        color: validColor,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide,
      });
    } catch (error) {
      console.error(`Error creating glow material for balloon ${id}:`, error);
      return new THREE.MeshBasicMaterial({
        color: '#FF6B6B',
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide,
      });
    }
  }, [validColor, id]);

  // Ensure valid size
  const validSize = Math.max(0.1, Math.min(0.5, size)); // Clamp size between 0.1 and 0.5

  return (
    <group ref={groupRef} position={position}>
      {/* Main Balloon */}
      <mesh 
        ref={balloonRef} 
        material={balloonMaterial}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[validSize, 20, 20]} />
      </mesh>
      
      {/* Main highlight */}
      <mesh 
        position={[validSize * 0.3, validSize * 0.3, validSize * 0.3]}
        material={highlightMaterial}
      >
        <sphereGeometry args={[validSize * 0.2, 8, 8]} />
      </mesh>

      {/* Secondary highlight */}
      <mesh 
        position={[validSize * 0.15, validSize * 0.45, validSize * 0.2]}
        material={highlightMaterial}
      >
        <sphereGeometry args={[validSize * 0.1, 6, 6]} />
      </mesh>

      {/* String */}
      <mesh 
        ref={stringRef}
        position={[0, -validSize * 2.5, 0]}
        material={stringMaterial}
      >
        <cylinderGeometry args={[0.01, 0.01, validSize * 4]} />
      </mesh>

      {/* Balloon knot */}
      <mesh position={[0, -validSize * 1.1, 0]} material={stringMaterial}>
        <sphereGeometry args={[0.04, 8, 8]} />
      </mesh>

      {/* Subtle glow effect */}
      <mesh position={[0, 0, 0]} scale={1.1}>
        <sphereGeometry args={[validSize, 16, 16]} />
        <primitive object={glowMaterial} />
      </mesh>
    </group>
  );
}

interface ThreeBalloonsProps {
  isActive: boolean;
}

export default function ThreeBalloons({ isActive }: ThreeBalloonsProps) {
  console.log('ThreeBalloons isActive:', isActive);
  const activationTime = useRef<number>(0);

  // Record when balloons become active
  useEffect(() => {
    if (isActive && activationTime.current === 0) {
      activationTime.current = performance.now();
      console.log('Balloons activated at:', activationTime.current);
    } else if (!isActive) {
      activationTime.current = 0;
    }
  }, [isActive]);

  const balloons = useMemo(() => {
    console.log('Creating continuous balloon flow...');
    const balloonData = [];
    
    // Verified color palette - all valid hex colors
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#AED6F1', '#D7BDE2', '#F9E79F',
      '#FF69B4', '#00CED1', '#FFD700', '#FF4500', '#9370DB',
      '#32CD32', '#FF1493', '#00BFFF', '#FFA500', '#DA70D6',
      '#20B2AA', '#FF7F50', '#9ACD32', '#FF6347', '#4169E1',
      '#FF8C00', '#8A2BE2', '#00FF7F', '#DC143C', '#00FFFF',
      '#FF00FF', '#ADFF2F', '#FF1493', '#00BFFF', '#FFD700'
    ];
    
    // Create balloons with proper validation
    for (let i = 0; i < 40; i++) { // Reduced to 40 for better performance
      const balloonColor = colors[i % colors.length];
      const balloonSize = 0.18 + Math.random() * 0.16;
      
      // Validate all parameters
      const balloonData_item = {
        position: [
          Math.max(-8, Math.min(8, (Math.random() - 0.5) * 16)), // Clamp X position
          Math.max(-6, Math.min(-2, -4 - Math.random() * 2)),    // Clamp Y position  
          Math.max(-6, Math.min(6, (Math.random() - 0.5) * 12))  // Clamp Z position
        ] as [number, number, number],
        color: balloonColor,
        delay: (i * 0.75) % 30, // Every 0.75 seconds, cycling every 30 seconds
        size: Math.max(0.15, Math.min(0.35, balloonSize)), // Clamp size
        id: i,
      };
      
      balloonData.push(balloonData_item);
    }
    
    console.log('Created', balloonData.length, 'validated balloons for continuous flow');
    return balloonData;
  }, []);

  if (!isActive) {
    console.log('Balloons not active, returning null');
    return null;
  }

  console.log('Rendering continuous balloon flow with', balloons.length, 'balloons');

  return (
    <group>
      {balloons.map((balloon, i) => (
        <Balloon 
          key={`balloon-${i}`} 
          {...balloon} 
          startTime={activationTime.current}
        />
      ))}
    </group>
  );
}