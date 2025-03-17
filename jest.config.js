module.exports = {
  testEnvironment: "jsdom", // Or 'node' for running tests in a Node.js environment
  testMatch: ["**/tests/**/*.ts?(x)", "**/?(*.)(spec|test).ts?(x)"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  //   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Optional: for global setup
};
