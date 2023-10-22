/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@controllers/(.*)': '<rootDir>/src/controllers/$1',
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@interfaces/(.*)': '<rootDir>/src/interfaces/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@routers/(.*)': '<rootDir>/src/routers/$1',
    '@middleware/(.*)': '<rootDir>/src/middleware/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
};