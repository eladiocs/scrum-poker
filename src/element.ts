import { defineCustomElement } from 'vue'
import ScrumPoker from './ScrumPoker.vue'

export const ScrumPokerElement = defineCustomElement(ScrumPoker)

export function registerScrumPoker(tagName = 'scrum-poker') {
  if (!customElements.get(tagName)) {
    customElements.define(tagName, ScrumPokerElement)
  }
}

registerScrumPoker()
