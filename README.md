# WebdriverIO tests

WebdriverIO tests Automated Tests for Cypress Real World App with WebdriverIO.

## Table of Contents
1. [Summary](#summary)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Usage](#usage)

## Summary
This repository contains automated tests for Rentzila using the WebdriverIO framework.

## Requirements
- Node.js (v14.17.3 or higher)
- WebdriverIO (v8.26.1 or higher)

All dependencies can be downloaded throught using this command after cloning repository:

Please make sure you have the necessary dependencies installed and the environment properly configured before running the tests. You can customize the tests in the [tests](tests) directory and configure the WebdriverIO options in the [config](wdio.config.ts) file as needed.

## Installation
1. Clone this repository to your local machine.
    ```
    git clone https://github.com/wasadar/renzila-wdio-tests.git
    ```

2. Navigate to the project directory.
    ```
    cd rentzila-wdio-tests
    ```

3. Install test's required dependencies.
    ```
    npm install
    ```

## Usage
### Running Tests
To run the automated tests using WebdriverIO, you can use the following npm scripts defined in the `package.json` file:

- Run the automated tests using WebdriverIO:
    ```
    npm run test:browser-name
    ```

- Run the automated tests in the headless mode using WebdriverIO:
```
npm run test:browser-name:headless
```

Test were mostly oriented for running in chrome, so they may fail in other browsers.