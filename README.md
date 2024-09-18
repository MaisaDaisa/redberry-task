# RedBerry Real-Estate

This project is for real estate management application built with React, TypeScript, and Vite.

# <span style="color: red">ATTENTION! FOR REDBERRY TEAM<span>

due to few issues with design i have commented sections with issues with <span style="color: blue">"DESIGN MISGUIDANCE"</span> so please look over the issues first before assessing the work

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/redberry-task.git
   cd redberry-task
   ```
2. install dependencies:
   ```sh
   npm install
   ```

## Development

To start the development server, run:

```sh
npm run dev
```

## Build

To build the project for production, run:

```sh
npm run build
```

This will generate the production build in the dist directory

## Project Structure

```sh
.env
.gitignore
.prettierrc.json
.vscode/
    launch.json
eslint.config.js
index.html
package.json
postcss.config.js
public/
README.md
src/
    api/
        apiConstants.ts
        apiTypes.ts
        deleteRequests.ts
        getRequests.ts
        postRequests.ts
    App.css
    App.tsx
    assets/
        fonts/
        img/
        svg/
    components/
        AddAgentFullscreenPopup.tsx
        ...
    fontFamily.css
    fonts.css
    index.css
    lib/
        ...
    main.tsx
    Pages/
    vite-env.d.ts
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## Key Files and Directories

- [src/](./src/): Contains the source code of the application
  - [api/](./src/api/): Contains API-related files such as constants, types, and request functions.
  - [components/](./src/components/) Contains React components.
  - [Pages/](./src/Pages/): Contains different pages of the application.
  - [assets/](./src/assets/): Contains static assets like fonts and images.
  - [lib/:](./src/lib/) Contains utility libraries.
  - [App.tsx](./src/App.tsx): The main application component.
  - [main.tsx](./src/main.tsx): The entry point of the application.
- [index.html](./index.html): The main HTML file.
- [tailwind.config.js](./tailwind.config.js): Tailwind CSS configuration.
- [.prettierrc.json](./.prettier.json): Prettier configuration.
- [vite.config.ts](./vite.config.ts): Vite configuration.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- Vite: A fast build tool and development server.
- Tailwind CSS: A utility-first CSS framework.
- Axios: A promise-based HTTP client for the browser and Node.js.
- ESLint: A tool for identifying and reporting on patterns in JavaScript.
- Prettier: An opinionated code formatter.

## Environment Variables

The project uses environment variables for configuration. Create a [.env](./.env) file in the root directory and add the following variables:

```sh
VITE_TOKEN=your_api_token
```
