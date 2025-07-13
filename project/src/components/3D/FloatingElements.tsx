import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const FloatingElements: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    mountRef.current.appendChild(renderer.domElement);

    // Create floating elements
    const geometries = [
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.ConeGeometry(0.5, 1, 8),
      new THREE.OctahedronGeometry(0.6)
    ];

    const materials = [
      new THREE.MeshPhongMaterial({ 
        color: 0x00ffff, 
        transparent: true, 
        opacity: 0.7,
        emissive: 0x001122 
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xff0080, 
        transparent: true, 
        opacity: 0.7,
        emissive: 0x220011 
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0x80ff00, 
        transparent: true, 
        opacity: 0.7,
        emissive: 0x112200 
      }),
      new THREE.MeshPhongMaterial({ 
        color: 0xffff00, 
        transparent: true, 
        opacity: 0.7,
        emissive: 0x222200 
      })
    ];

    for (let i = 0; i < 20; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geometry, material);
      
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );
      
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      scene.add(mesh);
      elementsRef.current.push(mesh);
      
      // Animate floating
      gsap.to(mesh.position, {
        duration: 5 + Math.random() * 10,
        y: mesh.position.y + (Math.random() - 0.5) * 20,
        x: mesh.position.x + (Math.random() - 0.5) * 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      gsap.to(mesh.rotation, {
        duration: 3 + Math.random() * 6,
        x: mesh.rotation.x + Math.PI * 2,
        y: mesh.rotation.y + Math.PI * 2,
        repeat: -1,
        ease: "none"
      });
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 30;

    // Mouse interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      elementsRef.current.forEach((element, index) => {
        const factor = (index + 1) * 0.1;
        gsap.to(element.rotation, {
          duration: 1,
          x: mouse.y * factor,
          y: mouse.x * factor,
          ease: "power2.out"
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default FloatingElements;