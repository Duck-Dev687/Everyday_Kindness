import { JestConfigWithTsJest } from 'ts-jest';

// Jest configuration
const config: JestConfigWithTsJest = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Adjust the path if using a .ts setup file
  testEnvironment: "jsdom",  // Ensure you're using jsdom for DOM manipulation tests
};

export default config;
