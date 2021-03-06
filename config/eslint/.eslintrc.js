module.exports = {
  plugins: [
    "jsx-a11y",
    "jest",
    "css-modules"
  ],
  env: {
    "browser": true,
    "node": true,
    "jest/globals": true
  },
  extends: [
    "airbnb",
    "plugin:jest/recommended"
  ],
  rules: {
    "global-require": ["off"],
    "react/destructuring-assignment": ["off"],
    "css-modules/no-unused-class": [2],
    "css-modules/no-undef-class": [2],
    "no-nested-ternary": ["off"],
    "camelcase": ["off"],
    "react/require-default-props": ["off"],
    "react/prefer-stateless-function": [2, {
      "ignorePureComponents": true
    }],
    "react/jsx-curly-spacing": ["off"],
    "react/no-array-index-key": ["off"],
    "react/jsx-one-expression-per-line": ["off"],
    "import/prefer-default-export": ["off"],
    "import/no-named-as-default": ["off"],
    "array-bracket-spacing": ["off"],
    "object-curly-newline": ["off"],
    "max-len": ["error", 160, 2, {
      "ignoreUrls": true,
      "ignoreComments": false,
      "ignoreRegExpLiterals": true,
      "ignoreStrings": true,
      "ignoreTemplateLiterals": true
    }],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }],
    "semi": [1, "never"],
    "no-plusplus": ["error", {
      "allowForLoopAfterthoughts": true
    }],
    "jsx-a11y/label-has-for": [2, {
      "components": ["Label"],
      "required": {
        "some": ["nesting", "id"]
      },
      "allowChildren": false
    }],
    "jsx-a11y/anchor-is-valid": ["error", {
      "components": ["Link"],
      "specialLink": ["to", "hrefLeft", "hrefRight"],
      "aspects": ["noHref", "invalidHref", "preferButton"]
    }],
    "linebreak-style": 0
  },
  parser: "babel-eslint",
  globals: {
    "webpackIsomorphicTools": false,
    "digitalData": false,
    "__DEVELOPMENT__": false
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".json"
        ]
      }
    }
  }
}
