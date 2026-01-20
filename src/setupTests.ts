import '@testing-library/jest-dom';

// Mock import.meta.env for Vite compatibility in Jest
Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_OMDB_API_KEY: 'test-api-key',
      },
    },
  },
  writable: false,
  configurable: true,
});