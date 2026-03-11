import "whatwg-fetch"
import "@testing-library/jest-dom"

class TextEncoderMock {
    encode(str: string) {
      return new Uint8Array([...str].map((c) => c.charCodeAt(0)))
    }
  }
  
  class TextDecoderMock {
    decode(input: ArrayBuffer | Uint8Array) {
      const arr = input instanceof Uint8Array ? input : new Uint8Array(input)
      return String.fromCharCode(...arr)
    }
  }
  
  globalThis.TextDecoder = TextDecoderMock as any

  ;(globalThis as any).TextEncoder = TextEncoderMock
  // ;(globalThis as any).TextDecoder = TextDecoderMock

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(globalThis as any).ResizeObserver = ResizeObserver

class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(globalThis as any).IntersectionObserver = IntersectionObserver

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
})