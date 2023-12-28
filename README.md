# Telegram Login Widget

[![Build Status](https://github.com/az33zy/telegram-login-widget/actions/workflows/ci.yml/badge.svg)](https://github.com/az33zy/telegram-login-widget/actions/workflows/ci.yml)
[![Version](https://badgen.net/npm/v/telegram-login-widget)](https://www.npmjs.com/package/telegram-login-widget)
[![Bundle Size](https://badgen.net/bundlephobia/minzip/telegram-login-widget)](https://bundlephobia.com/package/telegram-login-widget)
[![License](https://badgen.net/github/license/az33zy/telegram-login-widget)](LICENSE)

A zero-dependency package for validating Telegram Login Widget data using [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API).

## Getting Started

### Installation

```bash
pnpm add telegram-login-widget
```

### Usage

```js
import { validate } from 'telegram-login-widget'

const botToken = 'YOUR BOT TOKEN'

const data = {
  // Telegram Login Widget data
}

const isValid = await validate(botToken, data)

console.log(isValid)
```
