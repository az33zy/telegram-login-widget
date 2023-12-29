import { arrayBufferToHex, objectToDataCheckString } from './utils'

class ValidationError extends Error {
  /**
   * Creates a new ValidationError.
   *
   * @param {string} message - The error message.
   */
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

/**
 * Validates a bot token and its associated data against a hash.
 *
 * @param {string} botToken - The token to be validated.
 * @param {{ [key: string]: unknown }} authData - The authData object containing
 *   the hash and data.
 * @returns {Promise<boolean>} A promise that resolves to true if the calculated
 *   hash matches the provided hash, false otherwise.
 * @throws {ValidationError} If the auth data does not contain a hash string.
 */
async function validate(botToken, authData) {
  const { hash, ...data } = authData

  if (typeof hash !== 'string') {
    throw new ValidationError('Auth data should contain a hash string')
  }

  const calculatedHash = await calculateHash(botToken, data)
  return hash === calculatedHash
}

/**
 * Calculates a hash for a bot token and its associated data.
 *
 * @param {string} botToken - The token to be validated.
 * @param {{ [key: string]: unknown }} data - The data to be hashed.
 * @returns {Promise<string>} A promise that resolves to the calculated hash.
 */
async function calculateHash(botToken, data) {
  const encoder = new TextEncoder()

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

  const dataCheckString = objectToDataCheckString(data)

  const hash = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    encoder.encode(dataCheckString),
  )

  return arrayBufferToHex(hash)
}

export { validate, ValidationError }
