# Frontend UI — Generate Component from Spec

**Stage:** 5 of 10 — Frontend UI
**Who uses it:** Frontend Developer
**When:** After the API endpoints are available (or mockable), when building the UI.

---

Using the UI states defined in spec section I and acceptance criteria from section E of `specs/[module-name].md`, build the **[component name]** component.

The component must implement all 4 UI states:

1. **Loading state**: [Describe what the user sees while data loads — skeleton screen, spinner, placeholder content. Must match the layout of the success state.]

2. **Error state**: [Describe what the user sees when the fetch or action fails — error message, retry button, guidance text. Never show raw error objects.]

3. **Empty state**: [Describe what the user sees when there is no data — contextual message with a call to action. E.g., "No orders yet. Create your first order."]

4. **Success state**: [Describe what the user sees when data is present — the actual content, data tables, forms, etc.]

Requirements:

- Follow the project's component architecture (atomic design, container pattern)
- Extract stateful logic into custom hooks where it aids reuse
- Wire API calls to the endpoints defined in spec section I
- Implement all interaction behaviors described in the acceptance criteria (Section E)
- Handle form validation client-side before submission
- Show meaningful feedback for every user action (toast, inline message, state change)

**Project-specific guidance (ASDP Core Engine):**
- Follow the Atomic Design hierarchy: atoms → molecules → organisms → templates
- Icons from `@tabler/icons-react` — never `lucide-react`
- Style exclusively with TailwindCSS `className` — never `sx` or inline style
- Use `useTranslation()` hook from `src/lib/i18n/useTranslation.ts` for all user-facing strings
- Use Server Components by default; `'use client'` only for interactivity (pushed to leaf nodes)
- Use `cn()` from `src/lib/cn.ts` for conditional class merging
- Forms use React Hook Form with `valibotResolver` — schema in `modules/[feature]/schemas/`
- Data fetching via TanStack Query: `useQuery()` with `queryOptions` from `modules/[feature]/queries/`
- Follow the reference pattern in `src/modules/users/` for module-level components
- Feature-specific components live in `src/modules/[feature]/components/`, not in `src/components/`
- Shared reusable components live in `src/components/` under the appropriate atomic layer
