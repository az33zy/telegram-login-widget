/**
 * Validates a bot token and its associated data against a hash.
 * @param {string} botToken - The token to be validated.
 * @param {Record<string, unknown>} options - The options object containing the hash and data.
 * @param {string} options.hash - The hash to be compared against the calculated hash.
 * @returns {Promise<boolean>} - A promise that resolves to true if the calculated hash matches the provided hash, false otherwise.
 */
async function validate(botToken, { hash, ...data }) {
  const encoder = new TextEncoder()

  const dataCheckString = Object.keys(data)
    .filter((k) => data[k])
    .sort()
    .map((k) => `${k}=${data[k]}`)
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

  const calculatedHash = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    encoder.encode(dataCheckString),
  )

  const calculatedHashHex = Array.from(new Uint8Array(calculatedHash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')

  return calculatedHashHex === hash
}

export { validate }
