# Unit Conversion
Simple React app to test a converted temperature value from one unit to another.

Clone the repo. Hard dependency on NPM tooling.

## Let's do this
###Install dependencies
```
npm i
```

###Run tests
```
npm run test:coverage
```
Note that builds will fail in CI if coverage drops below 85% for lines, statements, functions, or branches.

###Run
```
npm run start
```
Webpack will attempt to open chrome browser to http://localhost:8081

###Build production output
```
npm run build
```
Deploy assets included in `./dist`

##About project
The configuration for babel, webpack, and jest are derived from [adamlund/minimal-react-setup](https://github.com/adamlund/minimal-react-setup).
