import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CamperVanProps {
  isActive: boolean;
}

export default function CamperVan({ isActive }: CamperVanProps) {
  console.log('CamperVan isActive:', isActive);
  
  const groupRef = useRef<THREE.Group>(null);
  const startTime = useRef(Date.now());
  const currentDirection = useRef<'left-to-right' | 'right-to-left'>('left-to-right');
  const journeyStartTime = useRef(Date.now());

  useFrame((state) => {
    if (!groupRef.current || !isActive) return;
    
    const elapsed = (Date.now() - startTime.current) / 1000;
    const journeyTime = (Date.now() - journeyStartTime.current) / 1000;
    
    // Each complete journey takes 12 seconds (6 seconds each direction)
    const journeyDuration = 12;
    const halfJourney = journeyDuration / 2;
    const journeyProgress = (journeyTime % journeyDuration) / journeyDuration;
    
    let x, z, rotation;
    
    // Determine current phase of the journey
    if (journeyProgress < 0.5) {
      // First half: left to right
      const progress = journeyProgress * 2; // 0 to 1
      x = -10 + progress * 20; // From -10 to +10
      z = -3 + Math.sin(progress * Math.PI * 2) * 0.8; // Slight weaving
      rotation = 0; // Facing right
      currentDirection.current = 'left-to-right';
    } else {
      // Second half: right to left  
      const progress = (journeyProgress - 0.5) * 2; // 0 to 1
      x = 10 - progress * 20; // From +10 to -10
      z = 3 + Math.sin(progress * Math.PI * 2) * 0.8; // Slight weaving (different path)
      rotation = Math.PI; // Facing left
      currentDirection.current = 'right-to-left';
    }
    
    groupRef.current.position.set(x, -1.2, z);
    groupRef.current.rotation.y = rotation;
    
    // Realistic driving effects
    const speed = Math.abs(x - (groupRef.current.position.x || 0)) * 60; // Approximate speed
    
    // Gentle bouncing motion (like driving on a road)
    const bounceFrequency = Math.max(4, speed * 0.5); // Faster bouncing at higher speeds
    groupRef.current.position.y = -1.2 + Math.sin(elapsed * bounceFrequency) * 0.03;
    
    // Slight tilting for realism (banking into turns)
    const tiltAmount = Math.sin(journeyProgress * Math.PI * 4) * 0.015; // Tilt during direction changes
    groupRef.current.rotation.z = tiltAmount;
    
    // Slight forward/backward rocking
    groupRef.current.rotation.x = Math.sin(elapsed * bounceFrequency * 0.7) * 0.008;
    
    // Add some randomness to make it feel more organic
    const randomSway = Math.sin(elapsed * 1.3 + 0.5) * 0.02;
    groupRef.current.rotation.y += randomSway;
  });

  if (!isActive) {
    console.log('Camper not active, returning null');
    return null;
  }

  console.log('Rendering wandering camper van');

  return (
    <group ref={groupRef}>
      {/* Main body - classic boxy camper van shape */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.4, 1.2]} />
        <meshStandardMaterial 
          color="#F5F5F5" 
          roughness={0.3} 
          metalness={0.1}
          clearcoat={0.2}
          clearcoatRoughness={0.8}
        />
      </mesh>
      
      {/* Cab/Front section */}
      <mesh position={[-1.3, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial 
          color="#F5F5F5" 
          roughness={0.3} 
          metalness={0.1}
          clearcoat={0.2}
          clearcoatRoughness={0.8}
        />
      </mesh>
      
      {/* Windshield */}
      <mesh position={[-1.8, 0.5, 0]} receiveShadow>
        <boxGeometry args={[0.1, 0.8, 1]} />
        <meshStandardMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.6}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      
      {/* Side windows */}
      <mesh position={[0.5, 0.6, 0.61]} receiveShadow>
        <boxGeometry args={[1.5, 0.6, 0.02]} />
        <meshStandardMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.6}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0.5, 0.6, -0.61]} receiveShadow>
        <boxGeometry args={[1.5, 0.6, 0.02]} />
        <meshStandardMaterial 
          color="#87CEEB" 
          transparent 
          opacity={0.6}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      
      {/* Wheels with rims */}
      {/* Front wheels */}
      <group position={[-0.9, -0.6, 0.7]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.22]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      <group position={[-0.9, -0.6, -0.7]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.22]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Rear wheels */}
      <group position={[0.9, -0.6, 0.7]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.22]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      <group position={[0.9, -0.6, -0.7]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.2, 0.2, 0.22]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Headlights */}
      <mesh position={[-1.9, 0.2, 0.4]}>
        <sphereGeometry args={[0.12]} />
        <meshStandardMaterial 
          color="#FFFACD" 
          emissive="#FFFACD" 
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[-1.9, 0.2, -0.4]}>
        <sphereGeometry args={[0.12]} />
        <meshStandardMaterial 
          color="#FFFACD" 
          emissive="#FFFACD" 
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Taillights */}
      <mesh position={[1.5, 0.2, 0.4]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial 
          color="#FF4444" 
          emissive="#FF2222" 
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[1.5, 0.2, -0.4]}>
        <sphereGeometry args={[0.08]} />
        <meshStandardMaterial 
          color="#FF4444" 
          emissive="#FF2222" 
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Side stripe (classic adventure van style) */}
      <mesh position={[0, 0.2, 0.62]}>
        <boxGeometry args={[2.8, 0.15, 0.02]} />
        <meshStandardMaterial color="#FF6B6B" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.2, -0.62]}>
        <boxGeometry args={[2.8, 0.15, 0.02]} />
        <meshStandardMaterial color="#FF6B6B" roughness={0.4} />
      </mesh>
      
      {/* Adventure decals */}
      <mesh position={[0.8, 0.5, 0.62]}>
        <boxGeometry args={[0.4, 0.3, 0.01]} />
        <meshStandardMaterial color="#4ECDC4" roughness={0.4} />
      </mesh>
      <mesh position={[0.8, 0.5, -0.62]}>
        <boxGeometry args={[0.4, 0.3, 0.01]} />
        <meshStandardMaterial color="#4ECDC4" roughness={0.4} />
      </mesh>
      
      {/* Roof rack */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2.4, 0.05, 0.8]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Roof rack rails */}
      <mesh position={[0, 1.25, 0.4]}>
        <boxGeometry args={[2.4, 0.03, 0.03]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 1.25, -0.4]}>
        <boxGeometry args={[2.4, 0.03, 0.03]} />
        <meshStandardMaterial color="#2C2C2C" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Door handle */}
      <mesh position={[1.2, 0.3, 0.62]}>
        <boxGeometry args={[0.15, 0.05, 0.03]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Exhaust pipe */}
      <mesh position={[1.3, -0.8, -0.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.3]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* License plate */}
      <mesh position={[-1.9, -0.1, 0]}>
        <boxGeometry args={[0.02, 0.2, 0.4]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
      
      {/* Spare tire on back */}
      <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#1C1C1C" roughness={0.9} />
      </mesh>
      <mesh position={[1.52, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.18, 0.16]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}