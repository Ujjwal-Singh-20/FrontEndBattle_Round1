import { useEffect, useRef } from 'react';

/**
 * Rotating Torus Knot — Three.js canvas for the CTA section.
 * - Wireframe torus knot at very low opacity (subtle background element).
 * - Rotation speed slightly influenced by mouse position.
 * - Dynamic import of Three.js.
 */
export default function CTACanvas() {
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
      const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.z = 11;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // Primary torus knot — wireframe, forsythia color
      const knotGeo = new THREE.TorusKnotGeometry(3, 0.9, 128, 18);
      const knotMat = new THREE.MeshBasicMaterial({
        color: 0xFFC801,
        wireframe: true,
        transparent: true,
        opacity: 0.07,
      });
      const knot = new THREE.Mesh(knotGeo, knotMat);
      scene.add(knot);

      // Outer torus ring — nocturnal teal, adds depth
      const ringGeo = new THREE.TorusGeometry(5, 0.15, 12, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x114C5A,
        wireframe: false,
        transparent: true,
        opacity: 0.12,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      scene.add(ring);

      let tx = 0, ty = 0;
      const onMouse = (e) => {
        tx = (e.clientX / window.innerWidth - 0.5) * 1.6;
        ty = -(e.clientY / window.innerHeight - 0.5) * 1.6;
      };
      window.addEventListener('mousemove', onMouse, { passive: true });

      let rafId, t = 0;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        t += 0.005;
        // Knot rotates on all axes — slightly influenced by mouse
        knot.rotation.x = t * 0.7 + ty * 0.25;
        knot.rotation.y = t + tx * 0.25;
        knot.rotation.z = t * 0.35;
        // Outer ring counter-rotates for interest
        ring.rotation.z = -t * 0.2;
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        if (!mount) return;
        const w = mount.clientWidth, h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize, { passive: true });

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
        if (mount?.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        renderer.dispose();
        knotGeo.dispose(); knotMat.dispose();
        ringGeo.dispose(); ringMat.dispose();
      };
    })();

    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
