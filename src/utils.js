/**
 * Converts an object to a data string.
 *
 * @param {{ [key: string]: unknown }} data - The data to be converted.
 * @returns {string} The data string.
 */
function objectToDataCheckString(data) {
  return Object.entries(data)
    .filter(([, value]) => value)
    .sort()
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')
}

/**
 * Converts an ArrayBuffer to a hex string.
 *
 * @param {ArrayBuffer} buffer - The buffer to be converted.
 * @returns {string} The hex string.
 */
function arrayBufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export { objectToDataCheckString, arrayBufferToHex }
