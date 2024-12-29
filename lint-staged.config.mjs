export default {
  '*': ['prettier --write --ignore-unknown'],
  '*.svelte': [() => 'pnpm check'],
  '*.{js,ts,svelte}': ['eslint --fix', 'prettier --write'],
  'package.json': ['npx sort-package-json --no'],
};
