import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import camperModel from '../assets/models/fiat_ducato_1989.glb';
import * as THREE from 'three';

interface CamperVanProps {
  isActive: boolean;
  modelPath?: string;
}

export default function CamperVan({ isActive, modelPath = camperModel }: CamperVanProps) {
  console.log('CamperVan isActive:', isActive);
  
  const groupRef = useRef<THREE.Group>(null);
  const startTime = useRef(Date.now());
  const currentDirection = useRef<'left-to-right' | 'right-to-left'>('left-to-right');
  const journeyStartTime = useRef(Date.now());

  // Load the GLB model
  const { scene, nodes, materials } = useGLTF(modelPath);
  
  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();
  
  // Apply white material to all meshes in the model
  const whiteMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffffff',
    roughness: 0.4,
    metalness: 0.1,
  });
  
  // Traverse the cloned scene and apply the white material
  clonedScene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = whiteMaterial;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  useFrame((state) => {
    if (!groupRef.current || !isActive) return;
    
    const elapsed = (Date.now() - startTime.current) / 1000;
    const journeyTime = (Date.now() - journeyStartTime.current) / 1000;
    
    const journeyDuration = 12;
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
    groupRef.current.rotation.y = rotation + Math.PI; // Add Math.PI to flip the model 180 degrees
    
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

  console.log('Rendering wandering camper van GLB model');

  return (
    <group ref={groupRef}>
      <primitive 
        object={clonedScene} 
        scale={[1, 1, 1]} // Adjust scale as needed
        position={[0, 0, 0]} // Adjust position offset if needed
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload(camperModel);