/**
 * React Native Polyfills
 * 
 * Import this file at the top of your React Native app to enable
 * all required polyfills for @algorandfoundation/xhd-wallet-api
 * 
 * Usage:
 * import '@algorandfoundation/xhd-wallet-api/polyfills';
 */

// BigInt support for React Native
import 'react-native-bigint';

// Crypto random values for secure random number generation
import 'react-native-get-random-values';

// Make sure global crypto.getRandomValues is available for @noble libraries
if (typeof global !== 'undefined' && !global.crypto) {
  global.crypto = require('react-native-get-random-values');
}

export { };