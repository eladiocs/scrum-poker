# scrum-poker

Componente "Scrum Poker" (selector de estimación) publicado como **Web Component nativo**
(`<scrum-poker>`), construido una sola vez en Vue y consumible desde cualquier
frontend — Vue, React, Angular, HTML plano, etc. — sin reescribir la UI en cada uno.

> El nombre del paquete y el registry (npm público / GitHub Packages / privado)
> todavía no están definidos. Reemplaza `scrum-poker` por el nombre real una vez
> publicado.

## Instalación

```sh
npm install scrum-poker
```

## Uso

Importar el paquete una sola vez registra el custom element `<scrum-poker>` en el
navegador (efecto secundario del import, no hace falta llamar a nada más).

```js
import 'scrum-poker'
```

Luego se usa como una etiqueta HTML normal en cualquier framework:

```html
<scrum-poker selected-button="3"></scrum-poker>
```

### API

| Nombre | Tipo | Descripción |
| --- | --- | --- |
| `selected-button` (atributo) | `string` | Valor preseleccionado al montar. Default: `"1"`. Valores válidos: `1, 2, 3, 5, 8, 13`. |
| `estimate-selected` (evento) | `CustomEvent<string>` | Se dispara cada vez que el usuario elige un valor. El valor elegido viene en `event.detail`. |

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

React no traduce automáticamente eventos custom del DOM a props `on*`, así que se
escucha con un `ref`:

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

Si usas TypeScript, declara el elemento en el JSX namespace para que no tire error de tipos:

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

Importar el paquete una vez (por ejemplo en `main.ts`) y habilitar
`CUSTOM_ELEMENTS_SCHEMA` en el módulo o componente standalone que use la etiqueta:

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

## Desarrollo local

```sh
npm install
```

### Demo con hot-reload

```sh
npm run dev
```

### Build de la app de demo

```sh
npm run build
```

### Build del Web Component publicable (`dist/scrum-poker.js`)

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

## IDE recomendado

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (deshabilitar Vetur).
