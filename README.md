# Etraveli Movie Application

Star Wars movie list application.

## Prerequisites

- **Node.js**: Version 22 or above

## How to Run

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open the application:**
   The application will be available at `http://localhost:5173` (or the URL shown in the terminal).

## How to test

This application use jest for unit testing.

**Run tests:**

```bash
npm test
```

## Architecture

This application try to follow simple version of clean architecture. The layers divided as `component`, `state` and `domain`.

The base is `domain` layer it has infrastructure and entity data of application data.

The `state` layer has representation of current state of application data.

Finally on the to has `component` layer, which has the UI logics and styles.

## API Information

**Note:** The original API was not working, so this application uses the Star Wars API from [swapi.info](https://swapi.info/) as an alternative data source.
