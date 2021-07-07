module.exports = {
    "parser": "@typescript-eslint/parser",
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
        "amd": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
    ],
    "globals": {
        "isStaff": "readonly",
        "isAuthorised": "readonly",
        "isMobile": "readonly",
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true,
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "import/no-named-as-default": 0,
        "indent": ["error", 'tab', { "SwitchCase": 1 }],
        "no-mixed-spaces-and-tabs": ["off", "always"],
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "camelcase": "off",
        "@typescript-eslint/camelcase": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "react/display-name": "off",
        "@typescript-eslint/no-object-literal-type-assertion": "off",
        "@typescript-eslint/explicit-function-return-type": [
            "warn",
            {
                "allowExpressions": true
            }
        ],
        "@typescript-eslint/no-var-requires": "off",
        "react-hooks/exhaustive-deps": "off",
    },
};
