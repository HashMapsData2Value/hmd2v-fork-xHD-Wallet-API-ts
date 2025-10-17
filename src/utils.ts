/**
 * React Native compatible utilities to replace Node.js Buffer operations
 */
import BN from 'bn.js';

/**
 * Concatenate multiple Uint8Arrays (replacement for Buffer.concat)
 */
export function concatUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
}

/**
 * Convert string to Uint8Array (replacement for Buffer.from(string))
 */
export function stringToUint8Array(str: string, encoding: 'utf8' | 'ascii' = 'utf8'): Uint8Array {
  if (encoding === 'ascii') {
    const result = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      result[i] = str.charCodeAt(i) & 0xFF;
    }
    return result;
  }

  // UTF-8 encoding
  return new TextEncoder().encode(str);
}

/**
 * Convert Uint8Array to string (replacement for Buffer.toString())
 */
export function uint8ArrayToString(arr: Uint8Array, encoding: 'utf8' | 'ascii' = 'utf8'): string {
  if (encoding === 'ascii') {
    return String.fromCharCode(...arr);
  }

  // UTF-8 decoding
  return new TextDecoder().decode(arr);
}

/**
 * Convert base64 string to Uint8Array (replacement for Buffer.from(str, 'base64'))
 */
export function base64ToUint8Array(base64: string): Uint8Array {
  // Remove any whitespace and padding
  const cleanBase64 = base64.replace(/\s/g, '');

  // Use built-in atob for base64 decoding
  const binaryString = atob(cleanBase64);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

/**
 * Convert Uint8Array to base64 string (replacement for Buffer.toString('base64'))
 */
export function uint8ArrayToBase64(arr: Uint8Array): string {
  let binaryString = '';
  for (let i = 0; i < arr.length; i++) {
    binaryString += String.fromCharCode(arr[i]);
  }
  return btoa(binaryString);
}

/**
 * Allocate a zero-filled Uint8Array (replacement for Buffer.alloc)
 */
export function allocUint8Array(size: number): Uint8Array {
  return new Uint8Array(size); // Already zero-filled by default
}

/**
 * Copy bytes from source to target (replacement for Buffer.copy)
 */
export function copyBytes(source: Uint8Array, target: Uint8Array, targetStart: number = 0, sourceStart: number = 0, sourceEnd?: number): void {
  const end = sourceEnd ?? source.length;
  const length = Math.min(end - sourceStart, target.length - targetStart);
  target.set(source.subarray(sourceStart, sourceStart + length), targetStart);
}

/**
 * Convert BN to Uint8Array with little endian encoding
 */
export function bnToUint8Array(bn: BN, length: number): Uint8Array {
  // Get bytes array from BN in little endian without forcing a specific length
  const array = bn.toArray('le');

  // If the array is longer than desired length, we need to handle it properly
  if (array.length > length) {
    // Take only the least significant bytes (truncate from the left for little endian)
    return new Uint8Array(array.slice(0, length));
  }

  // If the array is shorter, pad with zeros at the end (for little endian)
  if (array.length < length) {
    const padded = new Uint8Array(length);
    padded.set(array);
    return padded;
  }

  return new Uint8Array(array);
}

/**
 * Create a Uint8Array and write a 32-bit unsigned integer in little endian
 */
export function createDataWithUInt32LE(size: number, value: number, offset: number): Uint8Array {
  const data = new Uint8Array(size);
  // Write 32-bit value in little endian
  data[offset] = value & 0xFF;
  data[offset + 1] = (value >> 8) & 0xFF;
  data[offset + 2] = (value >> 16) & 0xFF;
  data[offset + 3] = (value >> 24) & 0xFF;
  return data;
}