"use client"; // make sure this is a client component because it uses useEffect and window

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { PMREMGenerator } from "three";

export default function MoonScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountNode = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = null;

    // Get actual size BEFORE initializing camera
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    const pmremGenerator = new PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    new RGBELoader().load("/moon_lab_1k.hdr", (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;

      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.6;
      texture.dispose();
      pmremGenerator.dispose();
    });

    const loader = new GLTFLoader();
    let moon: THREE.Object3D | null = null;
    loader.load(
      "/moon-v1.glb",
      (gltf) => {
        moon = gltf.scene;
        const size = width / 60000;
        moon.scale.set(size, size, size);
        moon.position.set(0, 0, 0);
        scene.add(moon);
        renderer.render(scene, camera);
      },
      undefined,
      (error) => {
        console.error("Failed to load model:", error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      if (moon) {
        moon.rotation.y += 0.003;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      // cleanup
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-[960px] h-[960px] " />;
}
