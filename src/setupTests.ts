// Disabled typechecking for this file to avoid issues with testing library types
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import '@testing-library/jest-dom';
import { TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
