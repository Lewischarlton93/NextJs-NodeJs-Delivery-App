module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  testTimeout: 7500,
  setupFilesAfterEnv: ["<rootDir>/src/__test__/jest-setup.ts"],
  moduleNameMapper: {
    "\\.svg$": "<rootDir>/src/__test__/__mock__/svgrMock.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "./src/__test__/tsconfig.test.json",
      },
    ],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
