export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      { useESM: true }
    ]
  },

  extensionsToTreatAsEsm: [".ts"],

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },

  transformIgnorePatterns: [
    "node_modules/(?!(msw|@mswjs|until-async)/)"
  ],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
}