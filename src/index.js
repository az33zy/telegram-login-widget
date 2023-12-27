/**
 * Validates a bot token and its associated data against a hash.
 * @param {string} botToken - The token to be validated.
 * @param {Object.<string, any> & {hash: string}} authData - The authData object containing the hash and data.
 * @returns {Promise<boolean>} - A promise that resolves to true if the calculated hash matches the provided hash, false otherwise.
 */
async function validate(botToken, { hash, ...data }) {
  const calculatedHash = await calculateHash(botToken, data)
  return hash === calculatedHash
}

/**
 * Calculates a hash for a bot token and its associated data.
 * @param {string} botToken - The token to be validated.
 * @param {Object.<string, any>} data - The data to be hashed.
 * @returns {Promise<string>} - A promise that resolves to the calculated hash.
 */
async function calculateHash(botToken, data) {
  const encoder = new TextEncoder()

  const dataCheckString = Object.entries(data)
    .filter(([_, value]) => value)
    .sort()
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')

  const secretKey = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(botToken),
  )

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    secretKey,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const calculatedHashArrayBuffer = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    encoder.encode(dataCheckString),
  )

  const calculatedHash = Array.from(new Uint8Array(calculatedHashArrayBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')

  return calculatedHash
}

export { validate, calculateHash }
