export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          jsx: 'react-jsx',
          esModuleInterop: true,
          types: ['node', 'jest', '@testing-library/jest-dom'],
        },
        diagnostics: {
          ignoreCodes: ['TS2307'],
        },
      },
    ],
  },
  globals: {
    TextEncoder: TextEncoder,
    TextDecoder: TextDecoder,
  },
};
