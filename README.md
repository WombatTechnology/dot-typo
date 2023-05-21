# VSCode .typo
.typo fix your typo automatticaly✅

![CleanShot 2023-05-20 at 17 15 51](https://github.com/WombatTechnology/typo-fixer/assets/6919381/71663ba9-c702-4ef1-8929-dfa12988ba7a)

## Install
You can install from [Marketplace](https://marketplace.visualstudio.com/items?itemName=WombatTechnology.dot-typo).

## Extension Settings
Create a config file named `.typo` at the root of your project.

Configurations should be written in JSON format, where the key is the correct word and the value is an array of common typos.

```json
{
  "CorrectWord": ["Typo1", "Typo2", "Typo3"]
}
```

Forexample:

`projectRoot/.typo`
```json
{
  "const": ["cosnt"],
  "import": ["imort", "improt"],
}
```
With this configuration, cosnt will be fixed to const, while imort and improt will be fixed to import when the file is saved.

## Release Notes
See [Change Log](https://marketplace.visualstudio.com/items/WombatTechnology.dot-typo/changelog)