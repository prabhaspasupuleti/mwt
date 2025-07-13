import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface FingerprintScannerProps {
  position?: [number, number, number];
  scale?: number;
}

const FingerprintScanner: React.FC<FingerprintScannerProps> = ({ 
  position = [0, 0, 0], 
  scale = 1 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh>();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(150, 150);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    mountRef.current.appendChild(renderer.domElement);

    // Create professional scanner geometry
    const geometry = new THREE.CylinderGeometry(0.8, 0.8, 0.1, 32);
    
    // Professional material with subtle glow
    const material = new THREE.MeshPhongMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.9,
      emissive: new THREE.Color(0x1e40af),
      emissiveIntensity: 0.2,
      shininess: 100
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.scale.setScalar(scale);
    scene.add(mesh);
    
    meshRef.current = mesh;

    // Professional lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x2563eb, 1, 100);
    pointLight.position.set(0, 3, 3);
    scene.add(pointLight);

    camera.position.z = 2.5;

    // Subtle rotation animation
    const animate = () => {
      requestAnimationFrame(animate);
      if (mesh) {
        mesh.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Professional hover effects
    const handleMouseEnter = () => {
      if (meshRef.current) {
        gsap.to(meshRef.current.scale, {
          duration: 0.3,
          x: scale * 1.1,
          y: scale * 1.1,
          z: scale * 1.1,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      if (meshRef.current) {
        gsap.to(meshRef.current.scale, {
          duration: 0.3,
          x: scale,
          y: scale,
          z: scale,
          ease: "power2.out"
        });
      }
    };

    mountRef.current.addEventListener('mouseenter', handleMouseEnter);
    mountRef.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeEventListener('mouseenter', handleMouseEnter);
        mountRef.current.removeEventListener('mouseleave', handleMouseLeave);
        if (renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      renderer.dispose();
    };
  }, [position, scale]);

  return (
    <div 
      ref={mountRef} 
      className="absolute pointer-events-auto cursor-pointer"
      style={{ width: '150px', height: '150px' }}
    />
  );
};

export default FingerprintScanner;