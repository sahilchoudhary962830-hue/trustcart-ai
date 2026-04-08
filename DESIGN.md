# Design Brief — TrustCart AI

**Purpose**: AI-powered review analyzer solving e-commerce trust verification. Professional, data-driven, authoritative.

**Tone**: Premium SaaS (Stripe/Notion caliber). Sophisticated, trustworthy, analytical — zero playfulness.

**Differentiation**: Confidence-driven UI. Charts animate with analytical precision. Trust badges feel earned, not decorative. Data visibility creates conviction.

---

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Purpose |
|-------|-------------|-----------|---------|
| Primary | `0.52 0.18 262` | `0.62 0.2 262` | Trust blue — verification, intelligence |
| Accent | `0.6 0.2 150` | `0.68 0.22 150` | Teal — safety, confidence |
| Secondary | `0.72 0.1 280` | `0.35 0.08 280` | Subtle purple — data depth |
| Destructive | `0.58 0.2 28` | `0.65 0.18 28` | Risk red — fake flag highlight |
| Muted | `0.94 0.02 0` | `0.22 0.01 245` | Neutral background transition |
| Background | `0.97 0.01 0` | `0.12 0.01 245` | Clean canvas (light: white-ish, dark: navy) |
| Foreground | `0.16 0.02 245` | `0.94 0.02 0` | Text contrast anchor |

**Charts**: `0.54/262` (primary blue) → `0.62/150` (teal) → `0.66/120` (cyan) → `0.7/90` (green) → `0.58/28` (red). Represents fake→trust gradient.

---

## Typography

| Tier | Font | Size | Weight | Use |
|------|------|------|--------|-----|
| Display | Space Grotesk | 32px–48px | 700 | Headlines, hero titles, trust scores |
| Body | DM Sans | 14px–16px | 400–500 | Paragraph text, UI labels, reviews |
| Label | DM Sans | 12px | 600 | Form labels, badge text, metadata |

---

## Structural Zones

| Zone | Background | Border | Purpose |
|------|------------|--------|---------|
| Header/Nav | `bg-card` with `border-b` | `border-border` | Navigation, logo, mode toggle |
| Hero | `bg-background` | None | Review paste/upload focus area |
| Cards | `bg-card` | `border-border` subtle | Results, trust scores, product cards |
| Dashboard | `bg-muted/30` alternate sections | Dividers | Sections breathe with alternating `bg-background` |
| Sidebar | `bg-sidebar` | `border-sidebar-border` | Navigation tree, user menu |
| Footer | `bg-muted/20` | `border-t` | Links, copyright, settings |

---

## Elevation & Shadows

- **sm**: `0 2px 4px oklch(var(--primary) / 0.08)` — hover state, slight lift
- **md**: `0 4px 12px oklch(var(--primary) / 0.1)` — card hover, floating modals
- **lg**: `0 8px 24px oklch(var(--primary) / 0.12)` — popovers, tooltips
- **elevated**: `0 12px 32px oklch(var(--primary) / 0.15)` — deep modals, overlays

No neon glow. Primary-tinted shadows maintain color coherence.

---

## Shape & Spacing

- **Border radius**: `12px` (`--radius: 0.75rem`) — modern, soft, approachable
- **Spacing scale**: 4px, 8px, 12px, 16px, 24px, 32px — rhythm for cards, gaps, padding
- **Borders**: 1px `border-border` on cards; 2px `border-primary` on active/focus states

---

## Motion & Interactions

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| Fade in | `fade-in` + opacity 0→1 | 400ms | ease-out |
| Slide up | `slide-up` (Y: 10px→0) | 500ms | ease-out |
| Chart appear | `animate-chart-grow` scaleY | 600ms | ease-out |
| Trust badge | `animate-trust-badge` bounce | 500ms | custom-spring |
| Button hover | `transition-smooth` scale + shadow | 300ms | ease-out |
| Form focus | `ring` pulse via `pulse-soft` | 2s loop | ease-in-out |

**Philosophy**: Animations serve verification — charts grow bottom-up (data arriving), badges bounce with earned confidence. No frivolous motion.

---

## Component Patterns

- **Review input**: Large textarea with paste/upload tabs, placeholder prompt → fade-in result card on submit
- **Trust score display**: Large display number (48px) with colored ring (primary/accent/destructive) + animated gauge
- **Fake/Real comparison card**: Side-by-side with chart, toggle between % view + list view
- **Dashboard section header**: Small caps label + divider, alternating `bg-muted/30` sections
- **CTAs**: Primary buttons are `bg-primary` with `text-primary-foreground`, hover adds `shadow-md` + slight scale. Secondary buttons are `bg-card` with `border-border` and `text-foreground`.
- **Data table**: Striped rows (alternating `bg-card` + `bg-background`), hover row lifts to `shadow-sm`

---

## Constraints

- ✅ Light + dark mode fully designed (not just inverted)
- ✅ No raw hex or named colors — OKLCH only via CSS variables
- ✅ Typography limited to 2 font families (display + body)
- ✅ No gradients (backgrounds are solid OKLCH colors only; gradients appear only in chart fills if needed)
- ✅ Max 5 semantic colors (primary, secondary, accent, destructive, muted)
- ✅ Minimal shadows — tinted with primary color, never harsh
- ✅ Animations are purposeful (fade-in, slide-up, chart-grow, trust-badge) — no arbitrary bounces
- ✅ Container queries for responsive breakpoints (mobile-first `sm:`, `md:`, `lg:`)

---

## Signature Detail

**Confidence ring on trust score display**: A 12px border ring around the trust percentage (0–100) using the accent color, animated with `animate-chart-grow` on first appearance. When the score is ≥80%, the ring glows softly with `shadow-md` + primary-tinted shadow. This small detail signals "AI verified" and creates a memorable trust moment.

