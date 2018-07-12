module.exports = () => {
  return {
    files: ["tsconfig.json", "src/**/*.ts", "__mocks__/*.*", "!__tests__/*.ts"],
    tests: ["__tests__/**/*.spec.ts"],
    env: {
      type: "node",
      runner: "node"
    },
    testFramework: "jest",

    setup: wallaby => {
      const jestConfig = require("./package.json").jest;
      // for example:
      // jestConfig.globals = { "__DEV__": true };
      wallaby.testFramework.configure(jestConfig);
    }
  };
};
