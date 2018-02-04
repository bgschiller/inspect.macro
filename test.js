const pluginTester = require('babel-plugin-tester');
const plugin = require('babel-plugin-macros');

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: [
    `
    const inspect = require('./inspect.macro');

    inspect(1 + 1 * 5, func(14));
    `,
  ],
});