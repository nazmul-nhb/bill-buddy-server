import jsConfig from '@eslint/js';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['node_modules/*', 'dist/*'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        process: 'readonly',
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  jsConfig.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
      prettier,
    },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'off',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      "no-console": ["warn", { "allow": ["info", "warn", "error"] }],
      'no-undef': 'error',
      "@typescript-eslint/no-empty-object-type": "off",
      '@typescript-eslint/no-unused-expressions': 'error',
      "@typescript-eslint/consistent-type-imports": ["warn", { "prefer": "type-imports" }],
      "no-unused-vars": ["error", {
        "args": "all",
        "argsIgnorePattern": "^_",
        "caughtErrors": "all",
        "caughtErrorsIgnorePattern": "^_",
        "destructuredArrayIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": false
      }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": false
        }
      ]
    },
  },
  {
    files: ["src/app/modules/**/*.types.ts", "src/app/modules/**/*.interfaces.ts"],
    rules: { "no-unused-vars": "off" },
  },
  {
    files: ["src/server.ts"],
    rules: { "no-console": "off" },
  },
  // {
  //   files: ['src/app/**/*types.ts', 'src/app/**/types/*.ts'],
  //   rules: { "@typescript-eslint/no-explicit-any": "off" }
  // },
  {
    files: ['dist/**/*.js', 'scripts/**/*.cjs'],
    rules: { "@typescript-eslint/no-require-imports": "off" }
  }
];
