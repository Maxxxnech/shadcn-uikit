# Shadcn UIKit

A monorepo containing custom shadcn UI components, multiple color schemes, and interactive demos.

## 📦 Packages

This monorepo contains the following packages:

### [@acronis-platform/shadcn-uikit](./packages/ui)
The core UI component library built on top of shadcn/ui principles.

**Components:**
- Button (with multiple variants and sizes)
- Card (with Header, Title, Description, Content, Footer)
- Input (styled form inputs)

### [@acronis-platform/shadcn-uikit-demo](./packages/demo)
Interactive demo application showcasing all components with multiple color schemes.

**Features:**
- 6 pre-configured themes
- Component playground
- Live theme switching
- Responsive design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/acronis/shadcn-uikit.git
cd shadcn-uikit

# Install dependencies
pnpm install

# Build all packages
pnpm run build
```

### Running the Demo

```bash
# Start the demo application
cd packages/demo
pnpm run dev
```

The demo will be available at `http://localhost:3000`.

## 🎨 Themes

The UI kit includes multiple pre-built themes with light and dark mode support:

### Built-in Themes

1. **Acronis Default** - Standard Acronis brand colors (included by default)
2. **Acronis Ocean** - Alternative blue-focused theme with deeper ocean tones

### Theme Features

- ✅ **Light & Dark modes** - All themes support both modes
- ✅ **CSS-based** - Zero JavaScript overhead
- ✅ **Tree-shakeable** - Import only themes you use
- ✅ **Customizable** - Override CSS variables or create custom themes
- ✅ **SSR-compatible** - Works with server-side rendering

### Creating Custom Themes

You can create custom themes by copying the template file and customizing colors:

```bash
# See packages/ui/src/styles/themes/_template.scss for the template
```

All themes use CSS variables and can be fully customized. See [Theme Documentation](./packages/docs/THEMES.md) for details.

## 📖 Usage

### Installation

```bash
npm install @acronis-platform/shadcn-uikit
# or
pnpm add @acronis-platform/shadcn-uikit
# or
yarn add @acronis-platform/shadcn-uikit
```

### Import Styles

Import the main styles in your application entry point:

```typescript
// main.tsx or App.tsx
import '@acronis-platform/shadcn-uikit/styles';
```

### Initialize Theme System (Optional)

For theme switching and dark mode support:

```typescript
import { initializeThemeSystem } from '@acronis-platform/shadcn-uikit';

// Initialize on app startup
initializeThemeSystem();
```

### Using Components

All components are exported from the main package:

```tsx
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Input,
  Label,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@acronis-platform/shadcn-uikit';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <Alert>
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>This is an informational message.</AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
        <Badge variant="secondary">New</Badge>
      </CardFooter>
    </Card>
  );
}
```

### Available Components

The library includes 40+ components:

- **Layout**: Card, Separator, Sidebar, ScrollArea
- **Forms**: Input, Textarea, Select, Checkbox, Radio, Switch, Label, Form
- **Buttons**: Button, ButtonGroup
- **Navigation**: NavigationMenu, Breadcrumb, Tabs, Pagination
- **Overlays**: Dialog, Sheet, Drawer, Popover, Tooltip, AlertDialog
- **Feedback**: Alert, Badge, Chip, Tag, Progress, Spinner, Toast (Sonner)
- **Data Display**: Table, DataTable, Tree, Avatar, Calendar, DatePicker
- **Advanced**: Combobox, Command, Filter, Chart, Empty, Carousel

### Theme Switching

Switch between themes programmatically:

```typescript
import { applyTheme, applyColorMode, toggleColorMode } from '@acronis-platform/shadcn-uikit';

// Switch to ocean theme
applyTheme('acronis-ocean');

// Toggle dark mode
toggleColorMode();

// Or set specific mode
applyColorMode('dark');
applyColorMode('light');
applyColorMode('system'); // Follow system preference
```

#### Shadow DOM / embedded containers

When the app is rendered inside a shadow root (e.g. via module federation), theme classes must also be applied to the inner container element — not just `document.documentElement` — because CSS inside a shadow root uses `:host` selectors that don't inherit from the document.

Pass any number of additional container elements as the `extraRoots` parameter:

```typescript
import { applyTheme, applyNavVariant } from '@acronis-platform/shadcn-uikit';

// Apply theme to both document.documentElement and a shadow DOM inner container
const innerContainer = document.getElementById('app-container');
applyTheme('acronis-ocean', true, innerContainer ? [innerContainer] : []);

// Same for white-label nav variants
applyNavVariant('ingram-micro', true, innerContainer ? [innerContainer] : []);
```

Both `applyTheme` and `applyNavVariant` accept the same optional third parameter:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `theme` / `variant` | `ThemeName` / `WhiteLabelNavVariant` | — | The theme or variant to apply |
| `persist` | `boolean` | `true` | Whether to persist the choice to `localStorage` |
| `extraRoots` | `HTMLElement[]` | `[]` | Additional elements to receive the same theme classes |

### Using Alternative Themes

Import additional theme CSS files:

```typescript
// Import ocean theme
import '@acronis-platform/shadcn-uikit/styles/themes/acronis-ocean';

// Then apply it
import { applyTheme } from '@acronis-platform/shadcn-uikit';
applyTheme('acronis-ocean');
```

### TypeScript Support

The library is fully typed with TypeScript:

```tsx
import type { ButtonProps, CardProps } from '@acronis-platform/shadcn-uikit';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

### Utility Functions

Access utility functions for styling:

```typescript
import { cn } from '@acronis-platform/shadcn-uikit';

// Merge class names with Tailwind
const className = cn('base-class', condition && 'conditional-class', 'another-class');
```

## 🏗️ Project Structure

```
shadcn-uikit/
├── packages/
│   ├── ui/              # Core UI components library
│   │   ├── src/
│   │   │   ├── components/  # React components
│   │   │   ├── lib/         # Utility functions
│   │   │   └── index.ts     # Package exports
│   │   └── package.json
│   └── demo/            # Demo application
│       ├── src/
│       │   ├── App.tsx      # Main demo app
│       │   ├── themes/      # Theme definitions
│       │   └── index.css    # Global styles
│       └── package.json
├── package.json         # Root workspace config
└── README.md
```

## 🛠️ Development

### Build All Packages

```bash
pnpm run build
```

### Type Checking

```bash
pnpm run type-check
```

### Linting

```bash
pnpm run lint
```

## 📝 License

MIT License - Copyright (c) 2026 Acronis International GmbH

See [LICENSE](./LICENSE) for more details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🚀 Quick Reference

### Complete Setup Example

```tsx
// main.tsx
import '@acronis-platform/shadcn-uikit/styles';
import { initializeThemeSystem } from '@acronis-platform/shadcn-uikit';

initializeThemeSystem();

// App.tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@acronis-platform/shadcn-uikit';

export function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My App</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### Build Output

The package includes:
- **JavaScript**: `dist/index.js` (65KB) - All components (tree-shakeable)
- **Components**: `dist/components/ui/*.js` - Individual component files (1-3KB each)
- **TypeScript**: `dist/index.d.ts` + `dist/components/**/*.d.ts` - Full type definitions
- **Styles**: `dist/shadcn-uikit.css` (15KB) - Main styles with default theme
- **Themes**: `dist/themes/*.css` - Separate theme files (7-14KB each)

### Tree-Shaking ✅

The library is **fully tree-shakeable**. Your production bundle only includes components you actually use:

```typescript
// You import
import { Button, Card } from '@acronis-platform/shadcn-uikit';

// Production bundle includes: ~5KB (just Button + Card)
// NOT included: Input, Table, Dialog, or any other unused components
```

**Performance:** Using 10 components = ~20-30KB minified (~8-10KB gzipped)

### Package Exports

```typescript
// Main entry - all components
import { Button } from '@acronis-platform/shadcn-uikit';

// React-only entry
import { Button } from '@acronis-platform/shadcn-uikit/react';

// Styles
import '@acronis-platform/shadcn-uikit/styles';

// Themes
import '@acronis-platform/shadcn-uikit/styles/themes/acronis-ocean';

// Utils
import { cn } from '@acronis-platform/shadcn-uikit';

// Theme utilities
import { applyTheme, toggleColorMode } from '@acronis-platform/shadcn-uikit';
```

## 📚 Documentation

- [Tree-Shaking & Performance](./packages/docs/TREE_SHAKING.md) - Bundle optimization guide
- [Theme System Guide](./packages/docs/THEMES.md) - Complete theme usage guide
- [Theme Build Configuration](./packages/docs/THEME_BUILD.md) - Build setup details
- [Theme Architecture](./packages/demo/docs/THEME_ARCHITECTURE.md) - Token system architecture
- [UI Package Documentation](./packages/ui/README.md)
- [Demo Package Documentation](./packages/demo/README.md)

## 🔗 Links

- [shadcn/ui](https://ui.shadcn.com/) - The original inspiration
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
