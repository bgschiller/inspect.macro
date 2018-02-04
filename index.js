const { createMacro, MacroError } = require('babel-plugin-macros');
const generate = require('@babel/generator').default;

function inspect({ references, state, babel }) {
  const t = babel.types;

  const consoleLogAST = t.memberExpression(
    t.identifier('console'),
    t.identifier('log'));

  const buildLog = babel.template(`
  (function () {
    try {
      return EXPRESSION
    } catch (e) {
      return '(an error occurred)'
    }
  }())
  `);

  function replaceWithLog(path) {
    const finalArgs = [];
    path.node.arguments.forEach(arg => {
      const log = buildLog({ EXPRESSION: arg });

      finalArgs.push(
        t.stringLiteral(`${generate(arg).code}: `),
        log.expression);
    });
    path.node.arguments = finalArgs;
    path.node.callee = consoleLogAST;
  }

  references.default.forEach(path => {
    if (path.parentPath.type === 'CallExpression') {
      replaceWithLog(path.parentPath);
    } else {
      console.log('path.type is not a CallExpression', path.parentPath.type);
      throw new MacroError(
        'inspect is intended to be called like a function');
    }
  });
}

module.exports = createMacro(inspect);