import { expect, test } from 'vitest'
import { arrayBufferToHex, objectToDataCheckString } from '../src/utils'

test('arrayBufferToHex', () => {
  expect(arrayBufferToHex(new Uint8Array([0, 1, 2, 3]).buffer)).toBe('00010203')
})

test('objectToDataCheckString', () => {
  expect(objectToDataCheckString({ a: 1, b: 2, c: 3 })).toBe('a=1\nb=2\nc=3')
})
