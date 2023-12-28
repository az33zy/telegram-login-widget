import { expect, test } from 'vitest'
import crypto from 'crypto'
import { validate, ValidationError } from '../src/index'

Object.defineProperty(globalThis, 'crypto', { value: crypto })

test('validate with valid data', async () => {
  const isValid = await validate(
    '1234567890:AABHpZEzxk-9h2f2-n7fHMMW9S6vG3PR_f3',
    {
      id: 1,
      first_name: 'Name',
      auth_date: 1703663110,
      hash: '4d8904b5244e4fbdbfb175c4928309a4daf72a74d2f964532e4a20b9eec37c23',
    },
  )

  expect(isValid).toBe(true)
})

test('validate with invalid data', async () => {
  const isValid = await validate(
    '1234567890:AABHpZEzxk-9h2f2-n7fHMMW9S6vG3PR_f3',
    {
      id: 1,
      first_name: 'Name',
      auth_date: 1703663110,
      hash: 'invalid',
    },
  )

  expect(isValid).toBe(false)
})

test('validate with a missing hash', async () => {
  await expect(validate('token', {})).rejects.toThrow(ValidationError)
})
