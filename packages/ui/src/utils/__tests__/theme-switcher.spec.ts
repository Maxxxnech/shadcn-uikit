import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  applyTheme,
  applyNavVariant,
  getCurrentTheme,
  getCurrentNavVariant,
} from '../theme-switcher'

function makeContainer(): HTMLElement {
  const el = document.createElement('div')
  document.body.appendChild(el)
  return el
}

function cleanup(container: HTMLElement): void {
  document.body.removeChild(container)
}

beforeEach(() => {
  document.documentElement.className = ''
  localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

// ---------------------------------------------------------------------------
// applyTheme
// ---------------------------------------------------------------------------

describe('applyTheme', () => {
  describe('without extraRoots', () => {
    it('should add theme class to document.documentElement', () => {
      applyTheme('acronis-ocean')

      expect(document.documentElement.classList.contains('theme-acronis-ocean')).toBe(true)
    })

    it('should remove previous theme class from document.documentElement', () => {
      applyTheme('acronis-default')
      applyTheme('acronis-ocean')

      expect(document.documentElement.classList.contains('theme-acronis-default')).toBe(false)
    })

    it('should persist theme to localStorage when persist is true', () => {
      applyTheme('acronis-ocean', true)

      expect(localStorage.getItem('av-theme')).toBe('acronis-ocean')
    })

    it('should not persist theme to localStorage when persist is false', () => {
      applyTheme('acronis-ocean', false)

      expect(localStorage.getItem('av-theme')).toBeNull()
    })

    it('should remove nav variant classes when switching away from white-label', () => {
      document.documentElement.classList.add('nav-ingram-micro')
      applyTheme('acronis-ocean')

      expect(document.documentElement.classList.contains('nav-ingram-micro')).toBe(false)
    })

    it('should keep nav variant classes when applying white-label theme', () => {
      document.documentElement.classList.add('nav-ingram-micro')
      applyTheme('acronis-white-label')

      expect(document.documentElement.classList.contains('nav-ingram-micro')).toBe(true)
    })
  })

  describe('with extraRoots', () => {
    it('should add theme class to the extra root element', () => {
      const container = makeContainer()

      applyTheme('acronis-ocean', false, [container])

      expect(container.classList.contains('theme-acronis-ocean')).toBe(true)
      cleanup(container)
    })

    it('should add theme class to document.documentElement AND extra root', () => {
      const container = makeContainer()

      applyTheme('acronis-ocean', false, [container])

      expect(document.documentElement.classList.contains('theme-acronis-ocean')).toBe(true)
      cleanup(container)
    })

    it('should remove previous theme class from extra root when switching themes', () => {
      const container = makeContainer()
      applyTheme('acronis-default', false, [container])
      applyTheme('acronis-ocean', false, [container])

      expect(container.classList.contains('theme-acronis-default')).toBe(false)
      cleanup(container)
    })

    it('should apply theme to multiple extra roots independently', () => {
      const c1 = makeContainer()
      const c2 = makeContainer()

      applyTheme('acronis-ocean', false, [c1, c2])

      expect(c1.classList.contains('theme-acronis-ocean')).toBe(true)
      expect(c2.classList.contains('theme-acronis-ocean')).toBe(true)
      cleanup(c1)
      cleanup(c2)
    })

    it('should remove nav variant classes from extra root when switching away from white-label', () => {
      const container = makeContainer()
      container.classList.add('nav-ingram-micro')

      applyTheme('acronis-ocean', false, [container])

      expect(container.classList.contains('nav-ingram-micro')).toBe(false)
      cleanup(container)
    })

    it('should keep nav variant classes on extra root when applying white-label theme', () => {
      const container = makeContainer()
      container.classList.add('nav-ingram-micro')

      applyTheme('acronis-white-label', false, [container])

      expect(container.classList.contains('nav-ingram-micro')).toBe(true)
      cleanup(container)
    })

    it('should not affect extra root classes unrelated to theming', () => {
      const container = makeContainer()
      container.classList.add('my-custom-class')

      applyTheme('acronis-ocean', false, [container])

      expect(container.classList.contains('my-custom-class')).toBe(true)
      cleanup(container)
    })

    it('should still persist to localStorage when extraRoots are provided', () => {
      const container = makeContainer()

      applyTheme('acronis-ocean', true, [container])

      expect(localStorage.getItem('av-theme')).toBe('acronis-ocean')
      cleanup(container)
    })
  })
})

// ---------------------------------------------------------------------------
// applyNavVariant
// ---------------------------------------------------------------------------

describe('applyNavVariant', () => {
  describe('without extraRoots', () => {
    it('should add nav variant class to document.documentElement', () => {
      applyNavVariant('ingram-micro')

      expect(document.documentElement.classList.contains('nav-ingram-micro')).toBe(true)
    })

    it('should replace previous nav variant class on document.documentElement', () => {
      applyNavVariant('purple')
      applyNavVariant('ingram-micro')

      expect(document.documentElement.classList.contains('nav-purple')).toBe(false)
    })

    it('should persist nav variant to localStorage when persist is true', () => {
      applyNavVariant('ingram-micro', true)

      expect(localStorage.getItem('av-nav-variant')).toBe('ingram-micro')
    })

    it('should not persist nav variant to localStorage when persist is false', () => {
      applyNavVariant('ingram-micro', false)

      expect(localStorage.getItem('av-nav-variant')).toBeNull()
    })
  })

  describe('with extraRoots', () => {
    it('should add nav variant class to the extra root element', () => {
      const container = makeContainer()

      applyNavVariant('ingram-micro', false, [container])

      expect(container.classList.contains('nav-ingram-micro')).toBe(true)
      cleanup(container)
    })

    it('should add nav variant class to document.documentElement AND extra root', () => {
      const container = makeContainer()

      applyNavVariant('ingram-micro', false, [container])

      expect(document.documentElement.classList.contains('nav-ingram-micro')).toBe(true)
      cleanup(container)
    })

    it('should replace previous nav variant class on extra root', () => {
      const container = makeContainer()
      applyNavVariant('purple', false, [container])
      applyNavVariant('ingram-micro', false, [container])

      expect(container.classList.contains('nav-purple')).toBe(false)
      cleanup(container)
    })

    it('should apply nav variant to multiple extra roots', () => {
      const c1 = makeContainer()
      const c2 = makeContainer()

      applyNavVariant('ingram-micro', false, [c1, c2])

      expect(c1.classList.contains('nav-ingram-micro')).toBe(true)
      expect(c2.classList.contains('nav-ingram-micro')).toBe(true)
      cleanup(c1)
      cleanup(c2)
    })

    it('should not affect extra root classes unrelated to nav variants', () => {
      const container = makeContainer()
      container.classList.add('my-custom-class')

      applyNavVariant('ingram-micro', false, [container])

      expect(container.classList.contains('my-custom-class')).toBe(true)
      cleanup(container)
    })
  })
})

// ---------------------------------------------------------------------------
// getCurrentTheme / getCurrentNavVariant (smoke tests — not changed, but covered)
// ---------------------------------------------------------------------------

describe('getCurrentTheme', () => {
  it('should return the currently applied theme', () => {
    applyTheme('acronis-ocean', false)

    expect(getCurrentTheme()).toBe('acronis-ocean')
  })

  it('should return null when no theme class is present', () => {
    expect(getCurrentTheme()).toBeNull()
  })
})

describe('getCurrentNavVariant', () => {
  it('should return the currently applied nav variant', () => {
    applyNavVariant('ingram-micro', false)

    expect(getCurrentNavVariant()).toBe('ingram-micro')
  })

  it('should return null when no nav variant class is present', () => {
    expect(getCurrentNavVariant()).toBeNull()
  })
})
