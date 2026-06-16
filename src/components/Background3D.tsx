"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles constellation
    const count = 80;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 35; // X
      positions[i + 1] = (Math.random() - 0.5) * 35; // Y
      positions[i + 2] = (Math.random() - 0.5) * 20; // Z
      speeds[i / 3] = 0.005 + Math.random() * 0.01;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom Cyan glow points material
    const material = new THREE.PointsMaterial({
      color: 0x06b6d4, // Cyan glow
      size: 0.12,
      transparent: true,
      opacity: 0.2,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Large floating background network sphere
    const sphereGeo = new THREE.IcosahedronGeometry(10, 1);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Violet glow
      wireframe: true,
      transparent: true,
      opacity: 0.02,
    });
    const backgroundSphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(backgroundSphere);

    // Mouse coordinates tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
    };

    // Scroll parallax tracking
    let targetScrollY = 0;
    let currentScrollY = 0;

    const handleScroll = (e: Event) => {
      targetScrollY = (e as CustomEvent).detail?.scrollTop ?? window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("app-scroll", handleScroll);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse LERP
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Smooth scroll LERP
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;

      // Rotate particle field based on mouse & scroll position
      particles.rotation.y = elapsedTime * 0.01 + mouseX * 0.15;
      particles.rotation.x = -mouseY * 0.15 + currentScrollY * 0.0003;

      // Rotate background wireframe sphere slowly
      backgroundSphere.rotation.y = -elapsedTime * 0.015 - mouseX * 0.1;
      backgroundSphere.rotation.x = currentScrollY * 0.0001;

      // Upward particle drift animation
      const posArray = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        posArray[idx + 1] += speeds[i]; // move up

        // Wrap around boundary
        if (posArray[idx + 1] > 18) {
          posArray[idx + 1] = -18;
          posArray[idx] = (Math.random() - 0.5) * 35;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("app-scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-40 bg-background"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
