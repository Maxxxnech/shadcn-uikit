# Exploration: Base UI Migration Spec Review

Date: 2026-03-24

## Research question

Does the spec at `docs/superpowers/specs/2026-03-24-base-ui-migration-design.md` contain quality issues: dead links, factual errors, missing components, incorrect data-attribute mappings, structural gaps, or inconsistencies with the actual codebase?

## Scope

In scope: all seven review criteria provided (scope clarity, component lists, data-attribute table, Docker/CI, migration order, gaps/contradictions, over/under-specification). Out of scope: evaluating whether the migration itself is a good idea.

## Verdict

**ISSUES FOUND** -- 11 issues identified, 3 high severity, 5 medium, 3 low.

---

## Findings

### Issue 1 (HIGH): Missing components from "Migrate" list

The spec lists ~18 components to migrate but omits several files that directly import Radix primitives.

| File | Radix import | Spec status |
|---|---|---|
| `sheet.tsx` | `@radix-ui/react-dialog` | Not mentioned anywhere |
| `label.tsx` | `@radix-ui/react-label` | Listed under "No changes needed" |
| `form.tsx` | `@radix-ui/react-label` + `@radix-ui/react-slot` | Listed under "No changes needed" |
| `command.tsx` | `import { type DialogProps } from '@radix-ui/react-dialog'` | Not mentioned anywhere |

`sheet.tsx` is built entirely on `@radix-ui/react-dialog` (aliased as `SheetPrimitive`). It uses `data-[state=open]`, `data-[state=closed]` selectors extensively. It must either be in the "Migrate" list (if Base UI Dialog can serve as its primitive) or in the "Keep Radix" list with an explicit rationale.

`label.tsx` imports `@radix-ui/react-label`. The spec places Label in the "No changes needed" list. This is factually incorrect -- the file has a direct Radix dependency. It needs to be categorized as either "Migrate" (if Base UI has a Label equivalent) or "Keep Radix."

`form.tsx` imports both `@radix-ui/react-label` and `@radix-ui/react-slot`. The spec places it in "No changes needed." At minimum, its Radix dependencies need acknowledgment.

`command.tsx` imports `{ type DialogProps } from '@radix-ui/react-dialog'`. This is a type-only import and may resolve itself once `dialog.tsx` migrates, but the spec should explicitly note it as a downstream dependency of the Dialog migration.

**Confidence:** Corroborated -- verified by `grep` against the codebase.

### Issue 2 (HIGH): `base-select.tsx` already exists and uses Base UI

The codebase already has `base-select.tsx` which imports `from '@base-ui/react/select'`. This file:
- Already uses Base UI's Select component
- Already uses `data-[state=open]`, `data-[side=*]` Radix-style selectors (lines 31, 94-98), which suggests it was written during an earlier partial migration or as a parallel implementation

The spec does not mention `base-select.tsx` at all. The relationship between `select.tsx` (Radix) and `base-select.tsx` (Base UI) needs to be addressed: is `base-select.tsx` the target for the `select.tsx` migration? Should it be merged, replaced, or kept as-is?

**Confidence:** Corroborated -- verified by reading the file.

### Issue 3 (HIGH): `data-side` attribute migration missing from table

The data-attribute migration table covers `data-state` variants but omits `data-side` and `data-align`, which are used in multiple components:

- `tooltip.tsx`: `data-[side=bottom]`, `data-[side=left]`, `data-[side=right]`, `data-[side=top]`
- `popover.tsx`: same four `data-[side=*]` selectors
- `dropdown-menu.tsx`: same four `data-[side=*]` selectors
- `select.tsx`: `data-[side=*]` selectors
- `base-select.tsx`: `data-[side=*]` selectors

Base UI does use `data-side` attributes on positioned elements ([Popover docs](https://base-ui.com/react/components/popover)), so the migration path exists, but the spec's attribute table should document whether the selector syntax changes or stays the same.

**Confidence:** Corroborated -- `data-side` usage verified in codebase; Base UI `data-side` confirmed via official docs.

### Issue 4 (MEDIUM): `--radix-*` CSS custom properties not addressed

Several components reference Radix-injected CSS custom properties that will not exist after migration:

- `select.tsx`: `var(--radix-select-trigger-height)`, `var(--radix-select-trigger-width)`
- `navigation-menu.tsx`: `var(--radix-navigation-menu-viewport-height)`, `var(--radix-navigation-menu-viewport-width)`
- `popover.tsx`: `var(--radix-popover-content-transform-origin)`
- `dropdown-menu.tsx`: likely similar properties (line was truncated)

Base UI may inject equivalent CSS variables with different names, or may not provide them at all. The spec does not mention this migration vector. Each `--radix-*` variable needs a documented replacement strategy.

Note: `navigation-menu.tsx` is in the "Keep Radix" list so its `--radix-*` properties are fine, but the others are in the migration scope.

**Confidence:** Corroborated -- verified by grep.

### Issue 5 (MEDIUM): Package export paths use wrong package name

The spec's "Consumer output modes" table references:
- `@acronis/ui/styles`
- `@acronis/ui/styles/tokens`
- `@acronis/ui/styles/components`
- `@acronis/ui/tailwind-preset`

The actual package name is `@acronis-platform/shadcn-uikit`. The actual exports are:
- `@acronis-platform/shadcn-uikit/styles`
- `@acronis-platform/shadcn-uikit/styles/tokens`
- `@acronis-platform/shadcn-uikit/styles/components`
- `@acronis-platform/shadcn-uikit/tailwind-preset`

This is either a deliberate shorthand or an error. If shorthand, it should be noted. If intended as literal paths, it is wrong.

**Confidence:** Corroborated -- verified against `package.json` exports.

### Issue 6 (MEDIUM): Theme file list incomplete

The spec lists three SCSS theme files: `acronis-default.scss`, `acronis-ocean.scss`, `acronis-white-label.scss`.

The actual `src/styles/themes/` directory contains:
- `acronis-default.scss`
- `acronis-ocean.scss`
- `acronis-white-label.scss`
- `acronis-electric.scss` (missing from spec)
- `_template.scss`
- `index.scss`
- `README.md`

The `acronis-electric.scss` theme is omitted. Additionally, the `package.json` exports include `./styles/themes/cyber-chat` which is not listed in the spec either.

**Confidence:** Corroborated -- verified by directory listing and package.json.

### Issue 7 (MEDIUM): Base UI's Radio naming differs from spec

The spec maps `radio-group.tsx` to `RadioGroup.*`. Base UI's actual API uses [`Radio`](https://base-ui.com/react/components/radio) as the component namespace (e.g., `Radio.Root`, `Radio.Indicator`), not `RadioGroup.*`. The group functionality exists but the compound component naming is different from what the spec states.

**Confidence:** Substantiated -- based on Base UI documentation search results and the official component page title "Radio" (not "RadioGroup").

### Issue 8 (MEDIUM): `Slot` usage in "No changes needed" components

The spec lists `@radix-ui/react-slot` under "Keep Radix" but also lists several Slot consumers under "No changes needed":

- `button.tsx` -- imports `Slot` from `@radix-ui/react-slot`
- `breadcrumb.tsx` -- imports `Slot` from `@radix-ui/react-slot`
- `button-group.tsx` -- imports `Slot` from `@radix-ui/react-slot`
- `sidebar.tsx` -- imports `Slot` from `@radix-ui/react-slot`

These components are *not* "no changes needed" in a strict sense -- they depend on a Radix package. The spec does say `@radix-ui/react-slot` stays, but the "No changes needed" characterization is misleading. At minimum, these should be noted as "No changes needed (retains `@radix-ui/react-slot` dependency)."

**Confidence:** Corroborated.

### Issue 9 (LOW): Component count does not add up

The spec claims "~70 components total, ~18 migrate to Base UI, ~5 stay on Radix, ~20 need no changes." The numbers 18 + 5 + 20 = 43, leaving ~27 components unaccounted for. The actual file count is 70 `.tsx` files plus the `data-table/` subdirectory.

Components not categorized include: `app-shell.tsx`, `auth-layout.tsx`, `calendar.tsx`, `carousel.tsx`, `chart.tsx`, `combobox.tsx`, `command.tsx`, `dashboard-layout.tsx`, `date-picker.tsx`, `drawer.tsx`, `filter.tsx`, `pagination.tsx`, `resizable.tsx`, `secondary-menu.tsx`, `sheet.tsx`, `sidebar.tsx`, `sonner.tsx`, `split-layout.tsx`, `table.tsx`, `tree.tsx`, `base-select.tsx`, `data-table/`, and all `widget-*.tsx` files (which are partially covered by the catch-all "all Widget components" phrase).

The `~` prefix makes these soft claims, but several of the uncategorized components (sheet, command, sidebar) do have Radix dependencies and need explicit categorization.

**Confidence:** Corroborated.

### Issue 10 (LOW): `field.tsx` uses Radix data-attribute selectors without importing Radix

`field.tsx` contains `has-data-[state=checked]:bg-primary/5` -- a Tailwind selector that targets child elements emitting Radix's `data-state="checked"`. After Checkbox migrates to Base UI and emits `data-checked` instead, this selector will silently break.

The spec says `field.tsx` needs "No changes." This is incorrect -- it needs a selector update from `has-data-[state=checked]` to `has-data-checked` to match Base UI's Checkbox output.

Similarly, `data-table/data-table-column-header.tsx` uses `data-[state=open]:bg-accent` which depends on a Radix dropdown-menu emitting `data-state="open"`.

**Confidence:** Corroborated -- verified by grep. These components have no direct Radix import but have Tailwind selectors coupled to Radix data-attribute conventions.

### Issue 11 (LOW): Docker healthcheck may need `curl` installation

The `Dockerfile.storybook` is based on `mcr.microsoft.com/playwright:v1.56.1`. Playwright Docker images are Debian-based and typically include `curl`, but the spec does not verify this. If `curl` is absent, the healthcheck `["CMD", "curl", "-f", "http://localhost:6006"]` will silently fail, causing the `test-runner` service to either wait indefinitely or start before Storybook is ready.

An alternative healthcheck using `wget` (always present on Debian) or `node -e "fetch(...)"` would be more robust.

**Confidence:** Conjecture -- depends on the exact contents of the Playwright Docker image at v1.56.1.

---

## Summary of issues

| # | Severity | Section | Issue |
|---|----------|---------|-------|
| 1 | HIGH | Component categories | `sheet.tsx`, `label.tsx`, `form.tsx`, `command.tsx` missing or miscategorized |
| 2 | HIGH | Component categories | `base-select.tsx` (existing Base UI file) not addressed |
| 3 | HIGH | Data-attribute table | `data-side` and `data-align` attributes omitted |
| 4 | MEDIUM | Data-attribute table | `--radix-*` CSS custom properties not addressed |
| 5 | MEDIUM | Dual CSS output | Package export paths use wrong package name |
| 6 | MEDIUM | Theming | `acronis-electric.scss` and `cyber-chat` theme missing from list |
| 7 | MEDIUM | Component categories | Base UI uses `Radio.*` not `RadioGroup.*` |
| 8 | MEDIUM | Component categories | Slot-consuming components miscategorized as "no changes" |
| 9 | LOW | Overview | Component counts do not add up (~27 uncategorized) |
| 10 | LOW | Migration scope | `field.tsx` and `data-table-column-header.tsx` have Radix selector coupling |
| 11 | LOW | Docker setup | Healthcheck `curl` availability unverified |

## Open questions

1. What is the intended relationship between `select.tsx` and `base-select.tsx`?
2. What are the Base UI equivalents for `--radix-select-trigger-height`, `--radix-popover-content-transform-origin`, etc.?
3. Should `label.tsx` migrate to Base UI (does Base UI have a Field/Label primitive) or stay on Radix?
4. Is the `data-[side=*]` selector syntax identical between Radix and Base UI, or does it require changes?
5. Should `sheet.tsx` be treated as a Dialog variant (migrate alongside `dialog.tsx`) or kept separate?

## Sources

1. [Base UI Collapsible](https://base-ui.com/react/components/collapsible) -- confirmed component exists in Base UI
2. [Base UI Separator](https://base-ui.com/react/components/separator) -- confirmed component exists
3. [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area) -- confirmed component exists
4. [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog) -- confirmed component exists
5. [Base UI Radio](https://base-ui.com/react/components/radio) -- naming is `Radio.*`, not `RadioGroup.*`
6. [Base UI Popover](https://base-ui.com/react/components/popover) -- confirmed `data-side`, `data-open`, `data-closed` attributes
7. [Base UI Styling handbook](https://base-ui.com/react/handbook/styling) -- data attribute conventions
8. [MUI Releases Base UI 1 with 35 Accessible Components](https://www.infoq.com/news/2026/02/baseui-v1-accessible/) -- 35+ components at v1.0