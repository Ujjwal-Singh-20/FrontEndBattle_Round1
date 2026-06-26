import { useEffect, useRef } from 'react';

/**
 * Neural Network Particle Field — Three.js canvas for Hero section.
 * - 65 particles (yellow dots) drift around and form connections when close.
 * - Lines rendered via pre-allocated LineSegments buffer (never recreates geometry).
 * - Camera tilts smoothly toward the mouse cursor.
 * - Dynamic import of Three.js to avoid blocking initial render / TTI.
 */
const NUM_PARTICLES = 65;
const MAX_LINES = 180;
const CONNECT_DIST_SQ = 13 * 13;

export default function HeroCanvas() {
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
      const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 200);
      camera.position.z = 32;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);
      renderer.domElement.style.display = 'block';

      // Particle data: random positions + slow drift velocities
      const pData = Array.from({ length: NUM_PARTICLES }, () => ({
        x: (Math.random() - 0.5) * 68,
        y: (Math.random() - 0.5) * 48,
        z: (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 0.03,
        vy: (Math.random() - 0.5) * 0.03,
      }));

      // Points — single draw call, positions updated in-place each frame
      const ptPos = new Float32Array(NUM_PARTICLES * 3);
      const ptGeo = new THREE.BufferGeometry();
      ptGeo.setAttribute('position', new THREE.BufferAttribute(ptPos, 3));
      const ptMat = new THREE.PointsMaterial({ color: 0xFFC801, size: 0.55, transparent: true, opacity: 0.8 });
      scene.add(new THREE.Points(ptGeo, ptMat));

      // LineSegments — pre-allocated buffer, setDrawRange hides inactive pairs
      const lnPos = new Float32Array(MAX_LINES * 6);
      const lnAttr = new THREE.BufferAttribute(lnPos, 3);
      lnAttr.setUsage(THREE.DynamicDrawUsage);
      const lnGeo = new THREE.BufferGeometry();
      lnGeo.setAttribute('position', lnAttr);
      lnGeo.setDrawRange(0, 0);
      const lnMat = new THREE.LineBasicMaterial({ color: 0x114C5A, transparent: true, opacity: 0.4 });
      scene.add(new THREE.LineSegments(lnGeo, lnMat));

      // Smooth mouse tracking
      let tx = 0, ty = 0;
      const onMouse = (e) => {
        tx = (e.clientX / window.innerWidth - 0.5) * 7;
        ty = -(e.clientY / window.innerHeight - 0.5) * 4;
      };
      window.addEventListener('mousemove', onMouse, { passive: true });

      let rafId;
      const animate = () => {
        rafId = requestAnimationFrame(animate);

        // Drift particles, bounce off bounds
        for (let i = 0; i < NUM_PARTICLES; i++) {
          const p = pData[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x > 34 || p.x < -34) p.vx *= -1;
          if (p.y > 24 || p.y < -24) p.vy *= -1;
          ptPos[i * 3]     = p.x;
          ptPos[i * 3 + 1] = p.y;
          ptPos[i * 3 + 2] = p.z;
        }
        ptGeo.attributes.position.needsUpdate = true;

        // Build line segments for close pairs (O(n²), n=65, ~2080 checks — <1ms)
        let lc = 0;
        outer: for (let i = 0; i < NUM_PARTICLES; i++) {
          for (let j = i + 1; j < NUM_PARTICLES; j++) {
            if (lc >= MAX_LINES) break outer;
            const dx = pData[i].x - pData[j].x;
            const dy = pData[i].y - pData[j].y;
            const dz = pData[i].z - pData[j].z;
            if (dx * dx + dy * dy + dz * dz < CONNECT_DIST_SQ) {
              const o = lc * 6;
              lnPos[o]     = pData[i].x; lnPos[o + 1] = pData[i].y; lnPos[o + 2] = pData[i].z;
              lnPos[o + 3] = pData[j].x; lnPos[o + 4] = pData[j].y; lnPos[o + 5] = pData[j].z;
              lc++;
            }
          }
        }
        lnGeo.setDrawRange(0, lc * 2);
        lnAttr.needsUpdate = true;

        // Camera lazily tracks mouse (lerp 4%)
        camera.position.x += (tx - camera.position.x) * 0.04;
        camera.position.y += (ty - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

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
        ptGeo.dispose(); ptMat.dispose();
        lnGeo.dispose(); lnMat.dispose();
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
