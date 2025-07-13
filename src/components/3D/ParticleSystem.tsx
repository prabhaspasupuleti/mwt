import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  color?: string;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  count = 200, 
  color = '#3b82f6' 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    mountRef.current.appendChild(renderer.domElement);

    // Create subtle particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
      
      velocities[i] = (Math.random() - 0.5) * 0.01;
      velocities[i + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.3,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 30;

    // Gentle animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      const positions = particles.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count * 3; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
        
        // Wrap around
        if (positions[i] > 50) positions[i] = -50;
        if (positions[i] < -50) positions[i] = 50;
        if (positions[i + 1] > 50) positions[i + 1] = -50;
        if (positions[i + 1] < -50) positions[i + 1] = 50;
        if (positions[i + 2] > 50) positions[i + 2] = -50;
        if (positions[i + 2] < -50) positions[i + 2] = 50;
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
      particles.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [count, color]);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default ParticleSystem;