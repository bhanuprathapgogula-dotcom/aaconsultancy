"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 2, 50);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 2, 50);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x06b6d4, 1.5, 30);
    pointLight3.position.set(0, 5, -2);
    scene.add(pointLight3);

    // Group to hold the main sphere objects for rotation
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // 1. Outer wireframe sphere (Icosahedron)
    const outerGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    sphereGroup.add(outerMesh);

    // 2. Point cloud sphere on vertices
    const pointsMat = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.07,
      transparent: true,
      opacity: 0.8,
    });
    const pointCloud = new THREE.Points(outerGeo, pointsMat);
    sphereGroup.add(pointCloud);

    // 3. Inner solid/mesh wireframe sphere
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      shininess: 100,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    sphereGroup.add(innerMesh);

    // 4. Core solid glowing sphere
    const coreGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.15,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sphereGroup.add(coreMesh);

    // Background floating stars/particles
    const particlesCount = 250;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const velocities: number[] = [];

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Random coordinates inside a bounding box
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 8 - 2;

      // Small vertical drift speeds
      velocities.push((Math.random() - 0.5) * 0.005); // x
      velocities.push((Math.random() + 0.1) * 0.008);  // y (drift upwards)
      velocities.push(0); // z
    }

    particlesGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particlesMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.4,
    });

    const starParticles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(starParticles);

    // Mouse responsiveness variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to -1 to +1
      targetX = (event.clientX / window.innerWidth) * 2 - 1;
      targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow orbital rotations
      outerMesh.rotation.y = elapsedTime * 0.08;
      outerMesh.rotation.x = elapsedTime * 0.04;

      pointCloud.rotation.y = -elapsedTime * 0.06;
      pointCloud.rotation.x = -elapsedTime * 0.03;

      innerMesh.rotation.y = elapsedTime * 0.12;
      innerMesh.rotation.z = elapsedTime * 0.06;

      // Smooth mouse follow (LERP)
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Apply mouse offset to the whole sphere group
      sphereGroup.rotation.y = mouseX * 0.4;
      sphereGroup.rotation.x = -mouseY * 0.4;

      // Slowly float the group up and down
      sphereGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Animate background stars drift
      const positionsArray = starParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const idx = i * 3;
        // Apply vertical speed
        positionsArray[idx + 1] += velocities[i * 3 + 1];

        // Reset particle if it drifts too high
        if (positionsArray[idx + 1] > 6) {
          positionsArray[idx + 1] = -6;
        }

        // Add subtle horizontal noise
        positionsArray[idx] += Math.sin(elapsedTime + i) * 0.001;
      }
      starParticles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      pointsMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
    };
  }, []);

  const handleScroll = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-transparent"
    >
      {/* Background radial overlays */}
      <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-neon-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-15%] h-[600px] w-[600px] rounded-full bg-neon-purple/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm animate-pulse-slow">
            <span className="flex h-2 w-2 rounded-full bg-neon-cyan animate-ping" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-neon-cyan">
              Recruitment Experts
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] font-sans">
            Transforming
            <span className="block mt-2 bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Businesses Through
            </span>
            Elite Talent
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-400 max-w-xl mb-10 leading-relaxed font-sans font-light">
            We deliver premium IT & Non-IT staffing, executive search, and volume hiring solutions PAN India, connecting elite minds with progressive enterprises.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => handleScroll("#contact")}
              className="glow-btn-blue flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple px-8 py-4 text-sm font-semibold text-white uppercase tracking-wider transition-all duration-300 w-full sm:w-auto"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("#services")}
              className="flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-sm font-semibold text-white uppercase tracking-wider hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
            >
              Our Services
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>

        {/* Right Side 3D Graphics Canvas */}
        <div
          ref={containerRef}
          className="lg:col-span-5 h-[400px] sm:h-[500px] w-full relative flex items-center justify-center select-none"
        >
          {/* Animated Glow Halo behind canvas */}
          <div className="absolute h-72 w-72 rounded-full bg-gradient-to-r from-neon-blue/20 to-neon-cyan/20 blur-[80px] pointer-events-none" />
          
          <canvas
            ref={canvasRef}
            className="w-full h-full max-w-full outline-none pointer-events-auto"
          />

          {/* Floating UI Holographic Indicators */}
          <div className="absolute top-8 right-4 glass-panel rounded-lg px-4 py-2 border border-white/5 shadow-md flex items-center gap-3 backdrop-blur-md animate-bounce" style={{ animationDuration: "5s" }}>
            <div className="h-2 w-2 rounded-full bg-neon-cyan" />
            <span className="text-[10px] font-mono tracking-wider text-gray-400">SYS_STATUS: ACTIVE</span>
          </div>

          <div className="absolute bottom-8 left-4 glass-panel rounded-lg px-4 py-2 border border-white/5 shadow-md flex items-center gap-3 backdrop-blur-md animate-bounce" style={{ animationDuration: "6s", animationDelay: "1s" }}>
            <div className="h-2 w-2 rounded-full bg-neon-purple" />
            <span className="text-[10px] font-mono tracking-wider text-gray-400">ENGINE: WebGL_3D</span>
          </div>
        </div>
      </div>
    </section>
  );
}
