import { useEffect, useRef } from 'react';

/**
 * Floating Icosahedra — Social Proof section background.
 *
 * FIX: Canvas is now `inset: 0` (full section overlay) instead of a
 * right-aligned partial div. The section's overflow:hidden clips the
 * canvas cleanly at every edge — no geometry can escape.
 *
 * The THREE.Group is offset right so the geometry appears in the
 * right 40% of the section visually, while the canvas itself is
 * safely contained.
 */
export default function SocialProofOrb() {
  const mountRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup = null;

    (async () => {
      const THREE = await import('three');
      if (cancelled) return;

      const mount = mountRef.current;
      if (!mount) return;

      const W = mount.clientWidth;
      const H = mount.clientHeight;

      const scene = new THREE.Scene();

      // Camera offset slightly right so geometry appears in right portion
      const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
      camera.position.set(1.8, 0, 14);
      camera.lookAt(1.2, 0, 0);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // Group offset right — geometry stays in right third of section
      const group = new THREE.Group();
      group.position.set(1.2, 0, 0);
      scene.add(group);

      // Outer icosahedron — teal wireframe, subdivision 1
      const icoGeo = new THREE.IcosahedronGeometry(2.2, 1);
      const icoMat = new THREE.MeshBasicMaterial({
        color: 0x114C5A,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const ico = new THREE.Mesh(icoGeo, icoMat);
      group.add(ico);

      // Inner icosahedron — forsythia wireframe, base subdivision
      const ico2Geo = new THREE.IcosahedronGeometry(1.2, 0);
      const ico2Mat = new THREE.MeshBasicMaterial({
        color: 0xFFC801,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      });
      const ico2 = new THREE.Mesh(ico2Geo, ico2Mat);
      group.add(ico2);

      let rafId, t = 0;
      const animate = () => {
        rafId = requestAnimationFrame(animate);
        t += 0.004;
        ico.rotation.x  = t * 0.5;
        ico.rotation.y  = t * 0.8;
        ico2.rotation.x = -t * 0.7;
        ico2.rotation.y = t * 0.6;
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
        window.removeEventListener('resize', onResize);
        if (mount?.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        renderer.dispose();
        icoGeo.dispose(); icoMat.dispose();
        ico2Geo.dispose(); ico2Mat.dispose();
      };
    })();

    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <div
      ref={mountRef}
      className="social-proof-orb"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
