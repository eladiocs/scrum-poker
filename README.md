# scrum-poker

A "Scrum Poker" estimation picker component published as a **native Web
Component** (`<scrum-poker>`) in Typescript, built once in Vue and consumable from other frameworks (Vue, React and Angular) without rewriting the UI for each one.

> Published on the public npm registry:
> https://www.npmjs.com/package/scrum-poker

## Author

Eladio Carmona Sánchez

### API

| Name | Type | Description |
| --- | --- | --- |
| `selected-button` (attribute) | `string` | Preselected value on mount. Default: `"1"`. Valid values: `1, 2, 3, 5, 8, 13`. |
| `estimate-selected` (event) | `CustomEvent<string>` | Fired whenever the user picks a value. The chosen value is in `event.detail`. |

### Use it in your projects Vue/React/Angular

> **Note:** Replace your files only if you are using a newly created project. If not, you will have to figure out how to add it in.

> **Note:** Styles from files such as `index.css`, `main.css`, `base.css` can interfere with the component's styles. 
> Remove their content if you can. If not, you will have to figure out how to make styles not collision.

## Installation

```sh
npm install scrum-poker (or pnpm)
```

### Vue
Replace your `App.vue` with:

```vue
<script setup lang="ts">
import 'scrum-poker'

function onEstimateSelected(event: Event) {
  console.log((event as CustomEvent<string>).detail)
}
</script>

<template>
  <scrum-poker
    selected-button="3"
    @estimate-selected="onEstimateSelected"
  />
</template>
```

### React

Replace your `App.tsx` with:

```tsx
import { useEffect, useRef, useState } from 'react'
import 'scrum-poker'

function App() {
  const ref = useRef<HTMLElement>(null)
  const [, setLastEstimate] = useState<string | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onSelect = (event: Event) => {
      setLastEstimate((event as CustomEvent<string>).detail)
    }
    el.addEventListener('estimate-selected', onSelect)
    return () => el.removeEventListener('estimate-selected', onSelect)
  }, [])

  return (
    <div>
      <scrum-poker ref={ref} selected-button="3"></scrum-poker>
    </div>
  )
}

export default App
```

Create `scrum-poker.d.ts` inside `src` and declare the element so it doesn't throw a type error. **The correct place to do this depends on your React version:**

- **React 19+** — the `JSX` namespace moved inside the `'react'` module, so
  augment it there:

  ```ts
  import type { DetailedHTMLProps, HTMLAttributes } from 'react'

  declare module 'react' {
    namespace JSX {
      interface IntrinsicElements {
        'scrum-poker': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
          'selected-button'?: string
        }
      }
    }
  }
  ```

- **React 18 and earlier** — augment the global `JSX` namespace instead:

  ```ts
  declare global {
    namespace JSX {
      interface IntrinsicElements {
        'scrum-poker': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
          'selected-button'?: string
        }
      }
    }
  }
  ```

### Angular

Import the package in your `main.ts`:

```ts
import 'scrum-poker'
```

Replace your `app.ts` with:

```ts
import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class App {
  protected readonly title = signal('mi-app');
  protected readonly lastEstimate = signal<string | null>(null);

  onEstimate(event: Event) {
    this.lastEstimate.set((event as CustomEvent<string>).detail);
  }
}
```

Replace your `app.html` with:

```html
<scrum-poker selected-button="3" (estimate-selected)="onEstimate($event)"></scrum-poker>

<router-outlet />
```

## Local development

```sh
npm install
```

### Demo with hot-reload

```sh
npm run dev
```

### Build the demo app

```sh
npm run build
```

### Build the publishable Web Component (`dist/scrum-poker.js`)

```sh
npm run build:lib
```

### Tests

```sh
npm run test:unit
```

### Type-check

```sh
npm run type-check
```

## Publishing an update

1. Make the change in `ScrumPoker.vue` / `MyButton.vue` (or wherever) and commit it as usual.

2. Bump the version according to [semver](https://semver.org/):

   ```sh
   npm version patch   # 0.1.0 -> 0.1.1  (fix, nothing breaks)
   npm version minor   # 0.1.0 -> 0.2.0  (new prop/event, backwards compatible)
   npm version major   # 0.1.0 -> 1.0.0  (breaking change, e.g. renaming an attribute/event)
   ```

   Since this is a git repo, this automatically updates `package.json`, creates a
   commit for the new version, and creates a matching git tag — no need to edit
   the version by hand.

3. Publish:

   ```sh
   npm publish
   ```

   If your npm account has 2FA enabled, npm will prompt for the current
   6-digit code from your authenticator app.

   (`prepublishOnly` runs `build:lib` automatically, so `dist/scrum-poker.js` is
   always rebuilt from the current source before publishing.)

4. Push the commit and the tag to GitHub:

   ```sh
   git push && git push --tags
   ```

Consumers (React/Angular/Vue projects) pick up the update by running `npm update scrum-poker` or `npm install scrum-poker@latest` (or pnpm)
