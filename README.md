# TypeScript 2.0 + Webpack + Karma

This is a seed project that does the following:

- Lints the code using **TS lint**.
- Tests the code using **Karma** and **Jasmine**:
  + on **PhantomJS**, **Chrome** and **Firefox** (`npm run test`),
  + only on **PhantomJS** (`npm run test:ci`, suitable for CI),
  + on all browsers with live-reload (`npm run test:watch`).
- Generates coverage report using **Istanbul** & **istanbul-remap**.
- Builds TypeScript sources with **Webpack** generating:
  + a minified, distributable **ES5** file with a separate **ES6 shim**,
  + complementary **type declarations**,
  + matching **sourcemaps**.
- Generates documentation using **Typedoc**.
- Packages bundled JavaScript and type declarations into a distributable library.

## Building:

```
npm install
npm run build
npm pack
```

## Testing:

```
npm test
npm run test:ci
npm run test:watch
```
