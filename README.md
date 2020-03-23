# Figma [Spagett!](https://youtu.be/uyh3C1xDT3Y)

[![Actions Status](https://github.com/aarongarciah/figma-spagett/workflows/CI/badge.svg)](https://github.com/aarongarciah/figma-spagett/actions)

Figma plugin to spook your fellow designers.

![Figma Video Cover Artwork](.github/cover.png)

## Development

To develop a Figma plugin you need to install the desktop app. Learn more in the [Figma Plugin docs](https://www.figma.com/plugin-docs/setup/).

Available commands:

- `npm run dev`: starts the watcher for changes. Modify the files under the `src` folder and the code will be compiled automatically. Then, go to the Figma app and run your development plugin.
- `npm run build`: generates the production build in the `dist` folder. Before generating the build, it checks the TypeScript code for linting errors.
- `npm run test`: simple test that ensures that the `ui.html` and `plugin.js` files have been generated in the `dist` folder.
- `npm run lint`: lint TypeScript code.
- `npm run lint:fix`: lint and apply automatic fixes to TypeScript code. This script runs before `build`.

## Having problems?

Take a look if someone already opened [a similar issue](https://github.com/aarongarciah/figma-spagett/issues?utf8=%E2%9C%93&q=is%3Aissue+sort%3Aupdated-desc+) or open a [new one](https://github.com/aarongarciah/figma-spagett/issues/new).

---

Made with ♥️ by [Aarón García Hervás](https://twitter.com/aarongarciah)
