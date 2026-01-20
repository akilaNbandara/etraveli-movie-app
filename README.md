# Etraveli Movie Application

Star Wars movie list application. Access the application on this URL[https://akilanbandara.github.io/etraveli-movie-app/].

## Prerequisites

- **Node.js**: Version 22 or above

## How to Run

**Prepare environment**
Make a copy of `.env.example`, rename it as `.env`.
Update data with your data.

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open the application:**
   The application will be available at `http://localhost:5173/etraveli-movie-app` (or the URL shown in the terminal).

## How to test

This application use jest for unit testing.

**Run tests:**

```bash
npm test
```

**Code quality:**

In this project eslint and prettier use for maintain the code quality.

To check lint issues.

```bash
npm run lint
```

To format code

```bash
npm run format
```

**Build and Deploy:**

This application currently deployed on the github-pages. The `gh-pages` library use to deploy the application.
To deploy, push all the changes, then run,

```bash
npm run deploy
```

## Architecture

This application try to follow simple version of clean architecture. The layers divided as `component`, `state` and `domain`.

The base is `domain` layer it has infrastructure and entity data of application data.

The `state` layer has representation of current state of application data.

Finally on the top, has the `component` layer, which has the UI logics and styles.

## API Information

**Note:** The original `swapi` API didn't work, so this application uses the Star Wars API from [swapi.info](https://swapi.info/) as an alternative data source.

**Note:** The `omdb` API not working on the deployed version of gh-pages. Therefor, images and ratings data will not available.
