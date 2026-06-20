# Seller Frontend Platform

Welcome to the **Seller Frontend Platform**! This repository is a monorepo managing the core frontend packages and shared libraries for the Seller Micro-Frontend (MFE) ecosystem. It is built using NPM Workspaces and TypeScript.

## 🏗 Architecture

The repository is structured as a monorepo containing multiple independent but complementary packages located in the `packages/` directory.

### Packages Overview

1. **`@grab/seller-ui`**
   - **Purpose:** A shared, reusable UI component library.
   - **Tech Stack:** React 19, Radix UI, Tailwind CSS (implied by `tailwind-merge` and `clsx`), and Lucide React icons.
   - **Responsibilities:** Provides highly accessible, styled, and cohesive React components, layouts, and styles that are consumed by the various Seller MFEs to maintain a consistent look and feel across the platform.

2. **`@grab/seller-api`**
   - **Purpose:** The core API client and data-fetching layer.
   - **Tech Stack:** TypeScript, `url-template`, Vitest.
   - **Responsibilities:** Manages HTTP requests to the backend services. It includes utilities for HATEOAS, API discovery, and pagination, abstracting away the complexity of raw network requests.

3. **`@grab/seller-contracts`**
   - **Purpose:** Centralized types and interfaces.
   - **Tech Stack:** TypeScript.
   - **Responsibilities:** Houses all the shared TypeScript definitions, API contracts, and data models used across the seller frontend ecosystem, ensuring strict type-safety and alignment between the UI, API clients, and the backend.

### Dependency Flow
- **`@grab/seller-ui`** depends on **`@grab/seller-api`** for integrating API functionality into more complex components or hooks.
- Micro-frontends (MFEs) operating outside of this monorepo will consume these packages to build out their specific features.

## 🛠 Development

### Prerequisites
- Node.js `>= 20.19.0`
- NPM (v7 or later for workspaces support)

### Setup & Installation
To install dependencies for the root and all workspace packages:
```bash
npm install
```

### Available Scripts
From the root directory, you can run the following commands across all packages using NPM Workspaces:

- **Build everything:**
  ```bash
  npm run build
  ```
- **Typecheck all packages:**
  ```bash
  npm run typecheck
  ```
- **Run tests:**
  ```bash
  npm run test
  ```

## Publishing private packages

The three packages are published together and consumed using exact semantic versions.

1. Create the private `@grab` organization/scope in the npm registry and grant the release account publish access.
2. Create an npm automation token and add it to this GitHub repository as the `NPM_TOKEN` Actions secret.
3. Update all three package versions together. Also update the `@grab/seller-api` version used by `@grab/seller-ui`.
4. Run `npm run release:check` locally.
5. Run the **Publish shared packages** workflow in GitHub Actions.
6. Add the same read-capable `NPM_TOKEN` secret to the Seller, Product, and Inventory repositories.
7. Run `npm install` once in each consumer and commit its regenerated `package-lock.json`.

For local authenticated registry access, copy `.npmrc.example` to `.npmrc` and export `NPM_TOKEN`. Never commit `.npmrc` or the token.

The publish order is API, Contracts, then UI. Published versions cannot be overwritten; increase the versions before every release.

## 🧪 Testing
We use **Vitest** for our unit and integration tests (e.g., in the API package), and **MSW** (Mock Service Worker) for API mocking. Run `npm run test` from the root to execute all workspace test suites.
