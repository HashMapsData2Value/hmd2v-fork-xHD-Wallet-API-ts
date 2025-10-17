
# React Native Setup Guide

This library is fully compatible with React Native. Follow these instructions for a smooth setup:

## Installation

```bash
yarn add @algorandfoundation/xhd-wallet-api
yarn add react-native-bigint react-native-get-random-values
```

## Polyfills

Add these imports at the top of your app's entry file (e.g. `index.js` or `App.js`):

```javascript
import '@algorandfoundation/xhd-wallet-api/polyfills';
```

## Metro Configuration

If you encounter issues with crypto imports, add this to your `metro.config.js`:

```javascript
const { getDefaultConfig } = require('@react-native/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.alias = {
  ...config.resolver.alias,
  crypto: 'react-native-get-random-values',
};
module.exports = config;
```

## Usage Example

```javascript
import { fromSeed, XHDWalletAPI } from '@algorandfoundation/xhd-wallet-api';

const seed = new Uint8Array(32).fill(1); // Example seed
const rootKey = fromSeed(seed);
const wallet = new XHDWalletAPI(rootKey);
// ... use wallet API
```

## Utilities

React Native-compatible utilities are exported:

```javascript
import {
  concatUint8Arrays,
  stringToUint8Array,
  base64ToUint8Array,
  uint8ArrayToString,
  uint8ArrayToBase64
} from '@algorandfoundation/xhd-wallet-api';
```

## Migration from Buffer

Replace Node.js Buffer operations with provided utilities:

```javascript
// Node.js
// Buffer.concat([a, b])
// buffer.toString('utf8')
// buffer.toString('base64')

// React Native
concatUint8Arrays([a, b])
uint8ArrayToString(a)
uint8ArrayToBase64(a)
```