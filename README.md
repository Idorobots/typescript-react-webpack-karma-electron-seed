# TypeScript 2.0 + React + Webpack + Karma + Electron

This is a seed project that does the following:

- Lints:
  + the code using **TS lint**,
  + styles using **stylelint**.
- Tests the code using **Karma** and **Jasmine**:
  + on **PhantomJS**, **Chrome**, **Firefox** and **Electron** (`npm run test`),
  + only on **PhantomJS** (`npm run test:ci`, suitable for CI),
  + on all browsers with live-reload (`npm run test:watch`).
- Generates coverage report using **Istanbul** & **istanbul-remap**.
- Builds TypeScript sources with **Webpack** generating:
  + a minified, distributable **ES5** file with **React** et. all in a separate file,
  + complementary **type declarations**,
  + matching **sourcemaps**.
- Bundles assets, styles & HTML.
- Generates documentation using **Typedoc**.
- Packages produced files into:
  + distributable Electron app (`npm run package-app`),
  + package along with type declarations (`npm pack`).

## Building:

```
npm install
npm run build
npm run build:watch
npm run package-app
```

## Testing:

```
npm test
npm run test:ci
npm run test:watch
```

## Running:

```
npm start
```
