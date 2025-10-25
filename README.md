# PixiJS Learning Project

This project is a learning application for PixiJS, a fast 2D rendering library for WebGL and Canvas.

## Prerequisites

- [Node.js](https://nodejs.org/) (recommended version: 16.x or newer)
- npm (comes with Node.js)

## Installation

To install the project dependencies, run the following command in the project's root directory:

```bash
npm install
```

This command will install all necessary dependencies, including:
- pixi.js (v8.8.1) - the main library for 2D rendering
- TypeScript and other development dependencies

## Starting the Application

After installing the dependencies, you can start the application in development mode using the command:

```bash
npm run dev
```

or

```bash
npm start
```

Both commands will start the Vite development server, which will compile the code and serve the application at a local address (usually http://localhost:5173).

## Building for Production

To build the application for production, run:

```bash
npm run build
```

This command will:
1. Run the linter to check the code
2. Compile TypeScript
3. Build the optimized application for production with Vite

The resulting files will be generated in the `dist` directory.

## Project Structure

- `src/` - the source code of the application
  - `entities/` - game/application entities (shapes, containers, etc.)
  - `constants.ts` - constants used in the application
  - `main.ts` - the entry point of the application
- `public/` - static files (images, CSS, etc.)
- `index.html` - the main HTML file