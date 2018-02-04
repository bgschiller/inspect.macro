const { createMacro, MacroError } = require('babel-plugin-macros');
const template = require('babel-template');
const generate = require('@babel/generator').default;

const buildLog = template(`
  console.log(
`);

const consoleLogAST = t.memberExpression(
  t.identifier('console'),
  t.identifier('log'));

function replaceWithLog(path, t) {
  const finalArgs = [];
  path.node.arguments.forEach(arg => {
    finalArgs.push(
      t.stringLiteral(`${generate(arg).code}: `),
      arg);
  });
  path.node.arguments = finalArgs;
  path.node.callee = consoleLogAST;
}

function inspect({ references, state, babel }) {
  references.default.forEach(path => {
    if (path.parentPath.type === 'CallExpression') {
      replaceWithLog(path.parentPath, babel.types);
    } else {
      console.log('path.type is not a CallExpression', path.parentPath.type);
      throw new MacroError(
        'inspect is intended to be called like a function');
    }
  });
}

module.exports = createMacro(inspect);