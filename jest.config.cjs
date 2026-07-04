/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          types: ['jest', '@testing-library/jest-dom'],
          jsx: 'react-jsx',
        },
      },
    ],
  },
};

module.exports = config;
