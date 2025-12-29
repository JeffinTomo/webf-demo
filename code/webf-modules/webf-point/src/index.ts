/**
 * Auto-generated WebF module wrapper for "Point".
 *
 * This file is generated from a TypeScript interface that describes
 * the module API. It forwards calls to `webf.invokeModuleAsync` at runtime.
 */

import { webf } from '@openwebf/webf-enterprise-typings';
import type { InviteCode, Result } from './types';

export class WebFPoint {
  static isAvailable(): boolean {
    return typeof webf !== 'undefined' && typeof (webf as any).invokeModuleAsync === 'function';
  }

  static async shareInviteCode(code: InviteCode): Promise<Result> {
    if (!this.isAvailable()) {
      throw new Error('WebF module "Point" is not available. Make sure it is registered via WebF.defineModule().');
    }
    return webf.invokeModuleAsync('Point', 'shareInviteCode', code);
  }

}

export type {
  InviteCode,Result
} from './types';
