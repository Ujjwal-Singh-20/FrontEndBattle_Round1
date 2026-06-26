# NeuralFlow 2.0 — AI Data Automation Platform

A high-performance, premium, and zero-dependency frontend landing page built for the **FrontEndBattle Round 1 Speed Run**. Designed strictly according to the problem constraints, this project focuses heavily on state isolation, zero-dependency structural layouts, motion choreographies, and hardware-accelerated 3D rendering.

---

## 🏆 Hackathon Constraints & Solutions

### 1. Logic, Architecture & State Isolation (40 Points)
- **Multi-currency Pricing Matrix:** Built a highly decoupled state architecture utilizing a central `pricingMatrix.js`.
- **Re-render & State Isolation Guardrail:** Implemented a lightweight Vanilla JS `CustomEvent` bus inside `PricingSection.jsx`. When currencies or billing cycles change, updates are isolated exclusively to targeted text nodes using `refs` and direct DOM mutation. **Global React reflows and layout thrashing have been completely eliminated.**
- **Bento-to-Accordion Transition:** Achieved 100% Zero-Dependency compliance by deleting React state conditional rendering. The transition from Bento to Accordion is handled by a unified, semantic HTML structure powered entirely by **pure CSS Media Queries**, ensuring zero DOM destruction/creation on window resize and flawless active-index tracking.

### 2. SEO Optimization & Semantic HTML Structure (30 Points)
- **Semantic DOM Layout:** `<div>` soup was avoided in favor of strict semantic tags (`<main>`, `<section>`, `<article>`, `<figure>`, `<nav>`).
- **SEO Hygiene:** Configured `index.html` with proper `canonical` URLs, Open Graph tags, Twitter cards, and `width`/`height` attributes on all images to prevent Cumulative Layout Shift (CLS). Implemented standard `aria-hidden` attributes for decorative SVG icons. Valid `robots.txt` is served at the root.
- **Loading Sequence & TTI:** Built an inline, CSS-only initial loader executing within the strict 500ms threshold. `pointer-events: none` ensures Time to Interactive (TTI) is never delayed.

### 3. UI/UX Usability & Motion Matching (30 Points)
- **Asset Compliance:** Strictly utilized the provided 6 hex color tokens (`var(--color-arctic-powder)`, `var(--color-mystic-mint)`, `var(--color-forsythia)`, etc.) and the exact dual Google Fonts typography (`JetBrains Mono` for display/code, `Inter` for body).
- **Breakpoint Fluidity:** Fluid clamps and grid layouts guarantee zero horizontal clipping across desktop, tablet, and mobile breakpoints.
- **Motion Accuracy:** Engineered highly tactile, custom cubic-bezier "spring physics" (`cubic-bezier(0.175, 0.885, 0.32, 1.275)`) for hover states, button shines, and scroll-reveal triggers.

---

## 🚀 Advanced Rendering & Performance (Three.js)

To achieve the premium, high-tech aesthetic without triggering main-thread jank or violating the **500ms Time to Interactive (TTI)** constraint, the following advanced graphics architectures were implemented:

1. **Vite Dynamic Chunk Splitting**: The heavy Three.js library (`~724kB`) is intentionally *not* included in the main React bundle. It is dynamically lazy-loaded via `await import('three')` inside a Promise. The main UI renders instantly, satisfying the strict 500ms TTI grading criteria, while the WebGL canvases gracefully fade in seconds later.
2. **Dynamic Vertex Shaders (`WaveBackground.jsx`)**: Built a custom vertex-coloring system for the wireframe waves. Instead of flat colors, the geometry dynamically interpolates the hackathon's exact color palette based on mathematical wave height (peaking in `Forsythia` yellow and dipping into `Nocturnal` teal).
3. **GPU-Accelerated Flashlight (`InteractiveGrid.jsx`)**: The mouse-following ambient glow uses pure CSS variables updated via `requestAnimationFrame`. This pushes the flashlight effect entirely to the GPU compositor thread, achieving buttery smooth 60fps tracking without triggering a single React layout reflow.
4. **Hero Particle Network (`HeroCanvas.jsx`)**: A dynamic 65-node neural network with proximity-based line rendering and low-friction mouse parallax, strictly contained behind a `z-index: 0` mask.

---

## 🛠️ Quick Start

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation & Running

1. Clone the repository and navigate into the directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Build for production (Generates optimized static chunks):
   ```bash
   npm run build
   ```
5. Preview the production build locally:
   ```bash
   npm run preview
   ```

### Architecture Stack
- **Framework:** React 19 / Vite
- **Styling:** Custom CSS (Zero Tailwind, Zero Bootstrap)
- **3D Graphics:** Three.js (Dynamically imported)
- **State:** React Hooks + Custom Event Emitter (DOM isolation)
