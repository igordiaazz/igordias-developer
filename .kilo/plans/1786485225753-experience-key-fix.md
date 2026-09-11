# Fix duplicate React key in Experience section

## Context
The browser dev overlay shows, for both `/pt` and `/en`:

> Encountered two children with the same key, `[object Object]-[object Object]`.
> Keys should be unique ...
> src/components/sections/experience.tsx (20:11)

### Root cause
`src/components/sections/experience.tsx:20`
```tsx
<li key={`${item.company}-${item.period}`} className="relative">
```
`item.company` and `item.period` are `Localized` objects
(`{ pt: string; en: string }`). Stringifying them yields
`[object Object]-[object Object]` for **every** entry. With more than one
experience item, all `<li>` share the same key → React duplicate-key warning.

This regressed when `period` was changed to a `Localized` object (to localize
"Presente"/"Present"); before that, `period` was a plain string so the two keys
differed and no warning appeared.

## Fix
Add a stable, unique `id` to each experience entry and key on it.

1. `src/content/experience.ts`
   - Add `id: string` to the `ExperienceItem` type.
   - Add an `id` to each existing item:
     - Full-Stack (Metrópole Digital): `id: "metropole-digital"`
     - Suporte Técnico (SMS Parnamirim): `id: "sms-parnamirim"`
     - Analista de Suporte (Freelancer): `id: "freelancer"`

2. `src/components/sections/experience.tsx:20`
   - Change `key={`${item.company}-${item.period}`}` → `key={item.id}`.

## Affected files
- `src/content/experience.ts` — type + per-item `id`
- `src/components/sections/experience.tsx` — `key={item.id}`

## Verification
- `npm run build` passes (TypeScript, no errors).
- `npm run dev`, open `/pt` and `/en`: the duplicate-key warning is gone from
  the console / Next dev overlay.
- Prerendered HTML still contains all three experience entries in both locales.

## Risks
- Non-breaking: no other consumer treats `company`/`period` as a primitive key.
- No change to rendered content or copy.
