/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, expect, it } from 'vitest';
import { parseBootstrapSettings } from './bootstrapSettings.js';

describe('parseBootstrapSettings', () => {
  it('preserves autoConfigureMemory from settings containing comments', () => {
    const settings = parseBootstrapSettings(`{
      // Keep bootstrap parsing aligned with the main settings loader.
      "advanced": {
        "autoConfigureMemory": false
      }
    }`);

    expect(settings.advanced?.autoConfigureMemory).toBe(false);
  });

  it('accepts block comments in bootstrap settings', () => {
    const settings = parseBootstrapSettings(`{
      /* memory configuration */
      "advanced": {
        "autoConfigureMemory": true
      }
    }`);

    expect(settings.advanced?.autoConfigureMemory).toBe(true);
  });

  it('still rejects malformed JSON after comments are stripped', () => {
    expect(() =>
      parseBootstrapSettings(`{
        // comment
        "advanced": {
      }`),
    ).toThrow();
  });
});
