---
'telegram-login-widget': patch
---

Fix package.json exports, as it turns out that default export should be the last one in order to enhanced-resolve to resolve successfully. This is required for [Bundlephobia](https://bundlephobia.com/package/telegram-login-widget) to show Exports Analysis correctly.
