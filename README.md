
# AssignmentApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

## Development server

To start a local development server, run:

```bash
npm run startdev
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Configuration (backend URI)

This project does **not** commit `.env` to GitHub (secrets / local config).

- Local dev: create `./.env` from `./.env.example` and set:
	- `ASSIGNMENTS_API_URL=http://localhost:8010/api/assignments`
- Render.com (deploy): set the same value as an **Environment Variable** in the Render dashboard.

The build generates `src/app/shared/app-env.ts` from environment variables (Render/CI) or from `.env` (local).

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```


