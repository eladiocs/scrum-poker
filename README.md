# scrum-poker

A "Scrum Poker" estimation picker component published as a **native Web
Component** (`<scrum-poker>`), built once in Vue and consumable from any
frontend — Vue, React, Angular, plain HTML, etc. — without rewriting the UI
for each one.

> Published on the public npm registry:
> https://www.npmjs.com/package/scrum-poker

## Installation

```sh
npm install scrum-poker
```

## Usage

Importing the package once registers the `<scrum-poker>` custom element in
the browser (a side effect of the import — nothing else to call).

```js
import 'scrum-poker'
```

Then use it as a regular HTML tag in any framework:

```html
<scrum-poker selected-button="3"></scrum-poker>
```

### API

| Name | Type | Description |
| --- | --- | --- |
| `selected-button` (attribute) | `string` | Preselected value on mount. Default: `"1"`. Valid values: `1, 2, 3, 5, 8, 13`. |
| `estimate-selected` (event) | `CustomEvent<string>` | Fired whenever the user picks a value. The chosen value is in `event.detail`. |

### Vue

```vue
<script setup>
import 'scrum-poker'
</script>

<template>
  <scrum-poker
    selected-button="3"
    @estimate-selected="(e) => console.log(e.detail)"
  />
</template>
```

### React

React doesn't automatically translate custom DOM events into `on*` props, so
listen for it with a `ref`. Replace your `App.tsx` with:

```tsx
import { useEffect, useRef, useState } from 'react'
import 'scrum-poker'

function App() {
  const ref = useRef<HTMLElement>(null)
  const [lastEstimate, setLastEstimate] = useState<string | null>(null)

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
      {lastEstimate && <p>React received: {lastEstimate}</p>}
    </div>
  )
}

export default App
```

Create `scrum-poker.d.ts`.
If you're using TypeScript, declare the element so it doesn't throw a type
error. **The correct place to do this depends on your React version:**

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

Using the React 18 form (`declare global`) on React 19 compiles without error
but silently has no effect — TypeScript will still report `Property
'scrum-poker' does not exist on type 'JSX.IntrinsicElements'` on the JSX
usage above.

### Angular

Import the package once (for example in `main.ts`) and enable
`CUSTOM_ELEMENTS_SCHEMA` in the module or standalone component that uses the
tag:

```ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import 'scrum-poker'

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
export class EstimatePanelComponent {
  onEstimate(event: CustomEvent<string>) {
    console.log('estimate:', event.detail)
  }
}
```

```html
<scrum-poker selected-button="3" (estimate-selected)="onEstimate($event)"></scrum-poker>
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

Consumers (React/Angular/Vue projects) pick up the update by running
`npm update scrum-poker` or `npm install scrum-poker@latest`, depending on the
version range they pinned in their own `package.json`. A `major` bump won't be
picked up automatically — consumers need to bump it by hand, since it means
something breaks.

## Recommended IDE setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur).
