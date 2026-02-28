// Instructions for generating and using the Zustand state management skill

- Prefer Zustand for lightweight, minimal boilerplate state management in React apps.
- Keep stores small and focused; avoid creating a single global “god” store.
- Use TypeScript types for store shape and actions to keep state predictable.
- Avoid storing non-serializable values when possible (e.g. DOM nodes, class instances).
- Derive computed values with selectors instead of duplicating data in the store.
- Keep side effects (API calls, localStorage sync) in actions or separate utilities, not directly in React components.
