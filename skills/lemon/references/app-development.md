---
name: app-development
description: React/TailwindCSS application conventions. Use when building React web apps, choosing between Vite and Next.js, or writing React components and Tailwind-based UIs.
---

# App Development

## Framework Selection

| Use Case | Choice |
|----------|--------|
| SPA, client-only, dashboards, back-office | Vite + React |
| SSR, SSG, SEO-critical, file-based routing, API routes | Next.js |

## React Conventions

| Convention | Preference |
|------------|------------|
| Components | Function components with hooks |
| Language | TypeScript (`.tsx`) |
| Styling | TailwindCSS utility classes |
| State | React hooks + lightweight state libs when needed |
| File naming | `PascalCase` for components, `camelCase` for hooks |

### Component Structure

```tsx
// src/components/Button.tsx
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import React from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading?: boolean
}

export function Button({ children, loading, className = '', ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium
      bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
      ${className}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? 'Loading…' : children}
    </button>
  )
}
```

### Tailwind Usage

- **Layout**：优先用 `flex` / `grid`，结合 gap，而不是到处写 margin。
- **复用样式**：公共组件里抽象 className，或用 `clsx`/`cn()` 组合。
- **设计系统**：统一用 Tailwind 的色板和 spacing，不随意写自定义值，保证风格统一。
