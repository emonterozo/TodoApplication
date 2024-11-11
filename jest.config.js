module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.ts'],
  coveragePathIgnorePatterns: ['__tests__/test-utils.tsx', '__tests__/context-utils.tsx'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '__tests__/test-utils.tsx',
    '__tests__/context-utils.tsx',
  ],
};
