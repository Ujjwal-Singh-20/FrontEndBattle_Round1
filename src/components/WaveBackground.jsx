import React, { useEffect, useRef } from 'react';

/**
 * Premium 3D Wireframe Wave Background.
 * Renders a slow-moving terrain using Three.js with dynamic vertex coloring.
 * High waves peak in Forsythia (Yellow), troughs dip into Nocturnal (Teal).
 */
export default function WaveBackground({ opacity = 0.4 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = null;

    (async () => {
      const THREE = await import('three');
      if (cancelled) return;

      const mount = mountRef.current;
      if (!mount) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
      
      camera.position.set(0, 4, 12);
      camera.lookAt(0, -2, 0);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      const geometry = new THREE.PlaneGeometry(50, 30, 50, 30);
      geometry.rotateX(-Math.PI / 2);

      // We will use vertex colors to map the palette
      const material = new THREE.MeshBasicMaterial({
        vertexColors: true,
        wireframe: true,
        transparent: true,
        opacity: opacity,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const positions = geometry.attributes.position.array;
      const originalY = new Float32Array(positions.length / 3);
      for (let i = 0; i < positions.length; i += 3) {
        originalY[i / 3] = positions[i + 1];
      }

      // Prepare vertex color attribute
      const colors = new Float32Array(positions.length);
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Color Palette
      const colorForsythia = new THREE.Color(0xFFC801); // Yellow (Peaks)
      const colorNocturnal = new THREE.Color(0x114C5A); // Teal (Troughs)
      const tempColor = new THREE.Color();

      let rafId;
      let time = 0;

      const animate = () => {
        if (!mount) return;
        rafId = requestAnimationFrame(animate);
        time += 0.008;

        const positions = geometry.attributes.position.array;
        const colorArray = geometry.attributes.color.array;
        
        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i];
          const z = positions[i + 2];
          
          // Compound sine waves
          const waveX1 = 0.5 * Math.sin(x * 0.2 + time);
          const waveZ1 = 0.5 * Math.sin(z * 0.2 + time * 0.8);
          const waveX2 = 0.25 * Math.sin(x * 0.4 - time * 1.5);
          
          const totalY = waveX1 + waveZ1 + waveX2;
          positions[i + 1] = originalY[i / 3] + totalY;

          // Normalize Y from roughly -1.25 to 1.25 into a 0 to 1 range
          const normalizedHeight = Math.max(0, Math.min(1, (totalY + 1.25) / 2.5));

          // Interpolate between Nocturnal and Forsythia based on wave height
          tempColor.lerpColors(colorNocturnal, colorForsythia, normalizedHeight);
          
          colorArray[i] = tempColor.r;
          colorArray[i + 1] = tempColor.g;
          colorArray[i + 2] = tempColor.b;
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
        renderer.render(scene, camera);
      };
      
      animate();

      const onResize = () => {
        if (!mount) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      
      window.addEventListener('resize', onResize, { passive: true });

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('resize', onResize);
        if (mount?.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    })();

    return () => { cancelled = true; cleanup?.(); };
  }, [opacity]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      }}
      aria-hidden="true"
    />
  );
}
