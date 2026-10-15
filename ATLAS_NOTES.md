# The Atlas — implementation notes

Run: npm ci; npm run dev. Open /?view=graph. Build: npm run build.

References reviewed 2026-10-14:
- three-forcegraph (MIT): https://github.com/vasturiano/three-forcegraph — Object3D integration, custom node/link objects and position callbacks. Used directly in the shared Three.js scene.
- 3d-force-graph basic demo: https://vasturiano.github.io/3d-force-graph/example/basic/ — orbit interaction and spatial graph reference; no page copied.
- interactive-book-intro by mchtyldzx: https://github.com/mchtyldzx/interactive-book-intro — repository LICENSE declares MIT with attribution. Reviewed its Three.js r128/GSAP 3.12.5 CDN implementation, box-based cover/pages, metallic corners and lighting. No source/assets copied; custom hinged book and curved leaves implemented here. Reference credited here.
- Three.js (MIT): https://github.com/mrdoob/three.js/blob/dev/LICENSE — renderer, OrbitControls, EffectComposer, UnrealBloomPass and OutputPass.
- GSAP: https://gsap.com/community/standard-license/ — Standard No Charge license, not MIT. Used for website animation timelines; license permits website use.

BookModel: procedural midnight-blue leather cover texture, gold border/title, metal corners, layered paper edges, hinge and curved leaves.
KnowledgeData: 35 English objects and 40 connections grounded in the portfolio's research, projects, publications and tools; illustrative research navigation rather than an import of the full 134-triple dataset.
SceneManager: shared 3D scene, staged 10-second GSAP opening, custom graph growth, raycast selection, OrbitControls, camera focus, bloom, dust, resize and resource cleanup.
UI: search, node details, reset camera, replay. Mobile DPR/geometry/particle reductions and reduced-motion shortcut.

No model, font or texture downloads are needed at runtime. Desktop FPS and Safari compatibility still depend on the device; 60 FPS is a target, not a measured guarantee. Bloom is restrained; no depth-of-field pass is used to preserve graph label legibility.
