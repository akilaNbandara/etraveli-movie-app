# Etraveli Movie Application

Star Wars movie list application. Access the application on this URL[https://akilanbandara.github.io/etraveli-movie-app/].

## Prerequisites

- **Node.js**: Version 22 or above

## How to Run

1. **Prepare environment:**

	Make a copy of `.env.example`, rename it as `.env`.
	Update content with your data.

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open the application:**

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

## Future Improvements

- Can introduce tanstack-query for handle caching, retries and timeouts effectively.

- Improve test coverage and Implement end to end testing.

- Introduce more architecture layers to define the functionality more precisely.

- Improve UI/UX and Accessibility by adding keyboard navigation.

- Use state management tool like redux


## My thoughts on assignment

This assignment was a good opportunity to demonstrate my frontend development skills. It gave me the freedom to design the UI and choose the architecture and technologies I felt were most appropriate.

With that flexibility, I focused on creating a clear and scalable structure. I chose an architecture and folder structure that separates the application into logical layers, making the codebase easier to understand, maintain, and extend in the future. I used TypeScript to improve maintainability and to catch potential errors early during development.

Some decisions involved trade-offs. For example, I used React Context API for state sharing instead of a more powerful state management library such as Redux. This was a conscious choice to favor simplicity and clarity over additional complexity, as the application scope did not require a full state management solution.

I also chose Material UI to ensure visual consistency and to speed up development, allowing me to focus more on application structure and behavior rather than custom styling.

Overall, my goal was to deliver a solution that is clean, maintainable, and easy to evolve, while making pragmatic choices based on the scope of the assignment.
