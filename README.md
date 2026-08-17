# NovaFix V9 — BEST AI

## الملفات
- `index.html` — الموقع
- `api/support-ai.js` — الـBackend الذي يتصل بـ OpenAI
- `.gitignore` — يمنع رفع ملفات الأسرار

## إعداد الذكاء
الافتراضي:
- Model: `gpt-5.6-sol`
- Reasoning mode: `pro`
- Reasoning effort: `max`
- Last 40 chat messages are used as context.

## Vercel Environment Variables
المطلوب فقط:
`OPENAI_API_KEY`

اختياري:
`OPENAI_MODEL=gpt-5.6-sol`
`OPENAI_REASONING_MODE=pro`
`OPENAI_REASONING_EFFORT=max`

## مهم
لا تضع مفتاح OpenAI داخل index.html أو أي ملف في GitHub.

إذا ظهر داخل الشات:
`🤖 Nova AI • gpt-5.6-sol`
فالذكاء الحقيقي يعمل.

إذا ظهر:
`🧪 Nova AI • Demo`
فأنت فتحت الملف محليًا أو لم يتم إعداد المفتاح/Backend بشكل صحيح.

## Owner
`mohamdmod230@gmail.com`
