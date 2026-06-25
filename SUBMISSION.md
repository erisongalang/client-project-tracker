# Technical Reflection & Evaluation Guide

## 📝 Technical Reflection Answers

### 1. Why did you choose this implementation approach?
I utilized an isolated **Composable Layer Architecture** (`useProjects.js`) instead of spreading data operations across independent UI template components. 
* This cleanly separates business logic (such as storage management, latency tracking, and metrics calculation) from presentational components. 
* To elevate the user experience, I paired this architecture with **SweetAlert2** to handle data mutations defensively. Users are explicitly asked to confirm destructive updates (deletions) and modifications (edits), shifting validation from a passive checker to a proactive guard against accidental data loss.
* By isolating this logic into a composable, it made it incredibly simple to write isolated unit tests with **Vitest** without needing to spin up a heavy component-rendering virtual DOM.

### 2. What tradeoffs did you make?
* **Global Composables vs. State Libraries (Pinia):** For a simple CRUD application of this size, utilizing a lightweight, shared reactive composable achieves exactly what a state store does. I explicitly avoided or removed Pinia setup boilerplate to ensure the codebase remained ultra-lean, performant, and hyper-focused.
* **Modals vs. Dedicated Sub-Routing Pages:** I chose an inline modal setup for the Create/Edit workflow. While dedicated pages via `Vue Router` are better suited for extremely large forms, single-page modal wrappers combined with confirmation prompts offer a faster, more desktop-like user experience for lightweight project tracking.
* **Node Environment Targets:** To accommodate modern modular dependencies like `rolldown` and `vitest`, the toolchain mandates Node.js `v20.12.0+` or `v22 LTS`. This trades support for legacy, out-of-support Node v16/v18 runtimes for optimal build performance and access to modern native ESM hooks.

### 3. What would you improve if given additional time?
* **Granular Form Field Feedback:** Enhance the user experience by running validation checks on individual fields instantly upon element defocus (`@blur`), rather than assessing all rules exclusively at the final submission attempt.
* **Optimistic UI Transitions:** Use native Vue `<TransitionGroup>` elements to animate cards smoothly when items are added, sorted, or removed from the grid layout.
* **Comprehensive End-to-End Testing:** Expand beyond unit tests into visual browser workflow tracking by implementing Playwright or Cypress automation logic templates.

### 4. What was the most challenging part of this assessment?
The most challenging part was engineering the reactive calculation engine inside the computed pipeline in `App.vue`. Combining multi-word text search strings, multi-select dropdown state filters, and custom chronological sort weights into a single, performant array evaluation pipeline required highly intentional, clean, defensive programming practices.

### 5. Did you use AI tools during development?
Yes, AI was leveraged during development.
* **Which tools?** Gemini.
* **How were they used?** It was utilized strictly as an engineering efficiency multiplier and an automated peer-reviewer. While I architected the core application state machine (`useProjects.js`), engineered the deterministic weight-based sorting algorithm, and wrote the Vitest test definitions, I used the model to accelerate the generation of repetitive utility-first Tailwind classes for the UI responsive layout. Additionally, it was used to execute rapid syntax edge-case checks on JavaScript native Date objects and act as a secondary sanity check against the evaluation rubric parameters prior to final packaging.