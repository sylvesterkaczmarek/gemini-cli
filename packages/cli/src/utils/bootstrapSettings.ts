/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import stripJsonComments from 'strip-json-comments';

export interface BootstrapSettings {
  advanced?: {
    autoConfigureMemory?: boolean;
  };
}

/**
 * Parses the small settings subset needed before the full CLI settings loader
 * is available. User settings support JSON comments, so bootstrap parsing must
 * accept the same syntax as the main settings path.
 */
export function parseBootstrapSettings(rawSettings: string): BootstrapSettings {
  return JSON.parse(stripJsonComments(rawSettings)) as BootstrapSettings;
}
