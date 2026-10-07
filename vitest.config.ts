import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],

    // Vitest mag NOOIT de build-bestanden uitvoeren
    exclude: [
      "tests/**/*.js",
      "tests/**/*.d.ts",
      "tests/**/*.map"
    ],

    globals: true,
    environment: "node",
    clearMocks: true,
    restoreMocks: true,
    mockReset: true
  },
});

