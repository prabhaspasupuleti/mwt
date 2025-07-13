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
    
    renderer.setSize(200, 200);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    mountRef.current.appendChild(renderer.domElement);

    // Create fingerprint geometry
    const geometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
    
    // Create fingerprint texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Draw fingerprint pattern
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.arc(256, 256, 50 + i * 20, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      transparent: true,
      opacity: 0.8,
      emissive: new THREE.Color(0x001122),
      emissiveIntensity: 0.3
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.scale.setScalar(scale);
    scene.add(mesh);
    
    meshRef.current = mesh;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    camera.position.z = 3;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      if (mesh) {
        mesh.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Hover effects
    const handleMouseEnter = () => {
      if (meshRef.current) {
        gsap.to(meshRef.current.rotation, {
          duration: 0.5,
          y: meshRef.current.rotation.y + Math.PI,
          ease: "power2.out"
        });
        gsap.to(meshRef.current.scale, {
          duration: 0.3,
          x: scale * 1.2,
          y: scale * 1.2,
          z: scale * 1.2,
          ease: "back.out(1.7)"
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
      style={{ width: '200px', height: '200px' }}
    />
  );
};

export default FingerprintScanner;