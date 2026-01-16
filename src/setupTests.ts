import '@testing-library/jest-dom'

// @ts-expect-error: Unable to find a declaration file for module 'util'.
import { TextEncoder } from 'util'
// @ts-expect-error: TextEncoder is not defined in the global scope in some environments
global.TextEncoder = TextEncoder
