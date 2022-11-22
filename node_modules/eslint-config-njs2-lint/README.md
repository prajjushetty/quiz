# eslint-config-njs2-lint

Contains rules that are used by [Njs2 Framework / Team](https://www.npmjs.com/org/njs2)

## Installation

Install eslint-config-njs2-lint:

```
npm install --save-dev eslint-config-njs2-lint
```

Then, add `"njs2-lint"` to the "extends" array in your `.eslintrc.*` file. Make sure to put it **last,** so it gets the chance to override other configs.

<!-- prettier-ignore -->
```json
{
  "extends": [
    "some-other-config-you-use",
    "njs2-lint"
  ]
}
```

Finally, run `"eslint *.js"` or pass the folder-name which you want `"eslint"` to show lint errors on!

Extending `"njs2-lint"` turns off a bunch of core ESLint rules, as well as a few rules from other plugins that you may have added in the past!

Remember, `"rules"` always “wins” over `"extends"`!
If you end up adding your own rules to the rules section of the eslintrc file, then those will take precedence!



## License

[MIT](LICENSE).