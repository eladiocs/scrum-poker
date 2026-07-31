# scrum-poker

A "Scrum Poker" estimation picker component published as a **native Web
Component** (`<scrum-poker>`), built once in Vue and consumable from any
frontend — Vue, React, Angular, plain HTML, etc. — without rewriting the UI
for each one.

> The package name and registry (public npm / GitHub Packages / private)
> haven't been decided yet. Replace `scrum-poker` with the real name once
> it's published.

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
listen for it with a `ref`:

```jsx
import { useEffect, useRef } from 'react'
import 'scrum-poker'

function EstimatePanel() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const onSelect = (event) => console.log('estimate:', event.detail)
    el.addEventListener('estimate-selected', onSelect)
    return () => el.removeEventListener('estimate-selected', onSelect)
  }, [])

  return <scrum-poker ref={ref} selected-button="3"></scrum-poker>
}
```

If you're using TypeScript, declare the element in the JSX namespace so it
doesn't throw a type error:

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

## Recommended IDE setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur).
