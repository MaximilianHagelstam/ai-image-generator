/** @type {import("prettier").Config} */
module.exports = {
  bracketSpacing: true,
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  tabWidth: 2,
  endOfLine: 'auto',
  arrowParens: 'always',
  jsxSingleQuote: true,
  useTabs: false,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};
