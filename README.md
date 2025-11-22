# Retro Wizard Frontend: Headless WordPress with Next.js & GraphQL (AI Dev Log)

## 🎯 Project Overview (for AI)

This project, "Retro Wizard Frontend," is a demonstration of a modern, decoupled web application. Its primary purpose is to serve as a high-performance, dynamic frontend for a Headless WordPress Content Management System (CMS). The application showcases robust data fetching via GraphQL, dynamic routing, efficient image handling, and client-side logic for content presentation.

**This `README` also functions as a concise summary of our iterative development process, highlighting key architectural decisions and problem-solving steps.**

## 💡 Core Architectural Principles

1.  **Decoupled Architecture (Headless CMS):** WordPress is used *purely* as a data source and content management backend. The frontend Next.js application is entirely separate, communicating solely via an API.
2.  **GraphQL as the API Layer:** WPGraphQL is the exclusive data transport mechanism. This provides a single, strongly-typed, and efficient endpoint, eliminating multiple REST API calls.
3.  **Next.js App Router for Frontend:** Leverages Next.js's Server Components and App Router for performance (server-side rendering, static site generation where applicable), dynamic routing, and a modern development experience.
4.  **Tailwind CSS for Styling:** Utility-first CSS framework for rapid and consistent styling, utilizing a custom Synthwave-inspired color palette.
5.  **Client-Side Logic for Enhanced Experience:** Where WordPress's native API capabilities (e.g., search indexing for custom post types) proved insufficient, robust client-side filtering and randomization logic were implemented to ensure features function reliably.

## 🛠️ Technology Stack

* **Frontend Framework:** Next.js (App Router, JavaScript)
* **Styling:** Tailwind CSS (v3.x)
* **GraphQL Client:** Apollo Client (`@apollo/client`)
* **Backend / CMS:** WordPress (hosted on Pantheon)
* **GraphQL Server:** WPGraphQL WordPress Plugin
* **Custom Fields:** Advanced Custom Fields (ACF) WordPress Plugin
* **Custom Post Types:** CPT UI WordPress Plugin
* **Data Import:** Ultimate CSV Importer Free WordPress Plugin
* **Media Management:** WP Media Folder WordPress Plugin

## 🚀 Key Features & Implementation Details

### 1. Dynamic Routing (`/game/[slug]`, `/platform/[slug]`)

* **Implementation:** Leverages Next.js App Router's folder-based routing (`[slug]`).
* **Data Fetching:** Each dynamic page (e.g., `src/app/game/[slug]/page.js`) performs an `async` GraphQL query using `client.query()` to fetch specific `game` or `platform` data based on the URL `params`.

### 2. Homepage Content Randomization

* **Requirement:** Display 8 random games from a set of featured platforms (e.g., Genesis, SNES, TurboGrafx-16, Sega Master System).
* **Implementation:**
    * A `GET_GAMES_QUERY` fetches a larger buffer of games (e.g., `first: 50`) from GraphQL.
    * A custom `shuffle` (Fisher-Yates) utility function is used to randomize arrays.
    * Client-side logic filters these games by `platform.slug` and then shuffles/slices them to select 2 (or 3 for temporary balance) unique games per featured platform, ensuring a diverse and fresh homepage on each load.

### 3. Functional Search (`/search?q=[query]`)

* **Requirement:** Allow users to search for games by title.
* **Problem Encountered:** Native WPGraphQL `where: { search: $searchQuery }` proved unreliable for custom post types (e.g., `game` posts) due to WordPress's internal search indexing limitations.
* **Solution:** **Frontend Filtering (Client-Side Search):**
    * The `SEARCH_GAMES_QUERY` fetches a larger buffer of *all* relevant games (e.g., `first: 100`).
    * The `searchParams.q` (obtained from the URL via Next.js App Router's `await searchParams` mechanism) provides the user's search term.
    * An `Array.filter()` method performs a case-insensitive match on `game.title.toLowerCase().includes(lowerCaseQuery)` within the fetched game buffer.
    * This ensures 100% accurate search results for existing titles, independent of backend indexing.

### 4. Efficient Image Handling

* **Next.js `<Image />` Component:** Used extensively across the application (homepage cards, game detail page, search results) for automatic image optimization (lazy loading, responsive sizing via `sizes` prop, WebP conversion, etc.).
* **Hero Image:** A static `<img>` tag is used for the hero background for specific aesthetic control.
* **Modal Viewer:** A custom `ImageModal` component provides a full-screen, responsive lightbox for viewing game box art, utilizing `Next/Image` with `fill` and `object-contain` within an `overflow-hidden` parent for perfect scaling.

### 5. Styling and UI/UX

* **Tailwind CSS:** All styling, including responsive layouts, gradients (`bg-gradient-to-r`, `bg-gradient-to-t`), drop shadows, and blur effects (`backdrop-blur-xl`), is managed through Tailwind utility classes.
* **Synthwave Palette:** Custom `rw-orange` color defined in `tailwind.config.js` to match the project's aesthetic.
* **Glassmorphism Effect:** Achieved using `bg-slate-900/60`, `backdrop-blur-xl`, and `border border-white/10` on content cards and the main layout.

## ⚠️ Key Learning & Development Challenges

* **Next.js App Router Dynamic APIs:** Initially encountered `searchParams is a Promise and must be unwrapped with await` due to rapidly evolving Next.js (v15+) API changes. Resolved by explicitly `await searchParams`.
* **Image Styling with `fill` and `border-radius`:** Required careful application of `overflow-hidden` and `rounded-*` classes on the *parent container* of `Next/Image` components set to `fill` to prevent image bleed.
* **Backend Search Limitations:** The primary driver for implementing client-side search to guarantee functionality.
* **Dependency Management:** Minor conflicts with Tailwind CSS versions were temporarily resolved by downgrading to a stable v3 version.

## 📁 Project Structure Highlights

* `src/app/layout.js`: Global layout, defines metadata, imports global CSS.
* `src/app/page.js`: Homepage with random game grid and hero section.
* `src/app/game/[slug]/page.js`: Dynamic page for individual game details.
* `src/app/platform/[slug]/page.js`: Dynamic page for platform-specific game listings.
* `src/app/search/page.js`: Search results display page (frontend filtered).
* `src/app/about/page.js`: Static "About This Project" page detailing stack and features.
* `src/components/HeaderNav.js`: Main navigation, search bar, and mobile menu.
* `src/components/ImageModal.js`: Reusable component for full-screen image display.
* `src/lib/client.js`: Apollo Client setup for GraphQL endpoint.
* `tailwind.config.js`: Tailwind CSS configuration, including custom colors.

## 🤝 Conclusion

This project stands as a robust example of integrating a Headless WordPress backend with a modern Next.js frontend, leveraging GraphQL for efficient data exchange and client-side logic to enhance user experience and overcome backend limitations. It represents a journey through common challenges in decoupled architectures and their practical solutions.