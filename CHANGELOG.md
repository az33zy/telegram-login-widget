# telegram-login-widget

## 0.1.11

### Patch Changes

- 1dd6ae1: Fix package.json exports, as it turns out that default export should be the last one in order to enhanced-resolve to resolve successfully. This is required for [Bundlephobia](https://bundlephobia.com/package/telegram-login-widget) to show Exports Analysis correctly.

## 0.1.10

### Patch Changes

- 884c959: Add package.json export

## 0.1.9

### Patch Changes

- 62e74dd: Extract building before packing or publishing to a prepare script

## 0.1.8

### Patch Changes

- e6e7f03: Extract utililty functions to utils.js to be able to test them without exporting with index.js

## 0.1.7

### Patch Changes

- 01a2410: Throw an error if hash is missing
- 4ef0fd5: Add more tests

## 0.1.6

### Patch Changes

- 3edf44f: Use src/index.js directly without emiting dist/index.js

## 0.1.5

### Patch Changes

- 94b87be: Split calculateHash into smaller functions
- 4ae58e8: Add usage instructions to readme

## 0.1.4

### Patch Changes

- f25631b: Added tests

## 0.1.3

### Patch Changes

- 0167d8b: Add fallback entrypoint to package.json

## 0.1.2

### Patch Changes

- 178bd43: Extract calculateHash from validate

## 0.1.1

### Patch Changes

- ca6f808: Publish to npm
