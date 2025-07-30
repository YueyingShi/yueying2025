"use client"; // make sure this is a client component because it uses useEffect and window

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { PMREMGenerator } from "three";

type MoonSceneProps = {
  desktopSize?: number;
  mobileSize?: number;
};

export default function MoonScene({
  desktopSize = 960,
  mobileSize = 640,
}: MoonSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [size, setSize] = React.useState(() => {
    if (typeof window === "undefined") return desktopSize;
    return window.innerWidth <= 768 ? mobileSize : desktopSize;
  });
  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth <= 768 ? mobileSize : desktopSize;
      setSize(newSize);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [desktopSize, mobileSize]);

  useEffect(() => {
    if (!mountRef.current) return;
    const mountNode = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(size, size);
    camera.aspect = 1;
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

      renderer.toneMapping = THREE.CineonToneMapping;
      //other options: NeutralToneMapping
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

        moon.scale.set(size / 60000, size / 60000, size / 60000);
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

  return <div ref={mountRef} />;
}
