# Client Project Tracker (Digital Agency Frontend UI)

A clean, high-performance, and fully responsive Client Project Tracker designed for a digital agency setting. Built using **Vue 3 (Composition API)**, **Vite**, and **TailwindCSS**.

This application satisfies all core deliverables and optional bonus parameters: real-time search, multi-tier filtering, custom weight-based sorting, responsive mobile layouts, a dynamic status dashboard, defensive data confirmation dialogs, and a localized unit test suite.

## 🚀 System Requirements & Prerequisites

To successfully run the local development server and execute the automated test suite without ESM/bundler compilation crashes, ensure your environment meets the following specific requirements:

* **Node.js:** `v20.12.0` or higher required (Recommended: **`v22.0.0+ LTS`**). Older versions of Node do not provide the native `node:util` `styleText` export required by modern testing dependencies.
* **Package Manager:** `npm v10.0.0+` (packaged natively with modern Node installations).

### 🛠️ Tech Stack & Version Specifications
* **Frontend Framework:** Vue 3 (Composition API) `^3.5.0`
* **Build Tool & Asset Pipeline:** Vite `^5.0.0` or `^6.0.0`
* **Styling Engine:** TailwindCSS `^3.4.0` (or `^4.0.0`)
* **Premium UX Overlay Engine:** SweetAlert2 `^11.10.0`
* **Automated Testing Engine:** Vitest `^1.6.0` or `^2.0.0` with `happy-dom`

---

## 💻 Getting Started

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/erisongalang/client-project-tracker.git
   cd client-project-tracker
   ```

2. **Verify your local Node.js environment version matches requirements:**
   ```bash
   node -v
   ```

3. **Install project dependencies safely:**
   ```bash
   npm install
   ```

4. **Run the local development server:**
   ```bash
   npm run dev
   ```
   *The application will typically be accessible at http://localhost:5173/.*

5. **Run the automated unit test suite:**
   ```bash
   npm run test
   ```

---

## 💡 Engineering Assumptions & Features

1. **State Persistence Simulation:** To satisfy the "no backend implementation" constraint, the data layer utilizes a global Composable pattern synced with localStorage. Your custom creations, updates, and deletions persist across page reloads. If no local history exists, the app automatically self-hydrates using the core fallback dataset (test_data.json).
2. **Deterministic Sort Ordering:** Sorting by priority calculates assignments mathematically using strict static structural weights (High: 3, Medium: 2, Low: 1) to avoid native array sorting collisions.
3. **Data Integrity Safety Net:** Editing existing records prompts an explicit confirmation modal before saving. If canceled, the underlying form states remain populated, ensuring zero data loss if a user changes their mind mid-edit.
4. **Date Restrictions:** Standard local ISO configurations rule input models. Cross-field date-range form validation strictly ensures that a project's Due Date cannot chronologically precede its Start Date.

---

## 🔄 Technical Note: Developer Data Reset
If you want to clear your changes and force the application to instantly wipe out localStorage and re-populate the UI with the original pristine test_data.json, open your browser’s Developer Tools Console (F12) and run:

```localStorage.removeItem('agency_projects'); location.reload();

