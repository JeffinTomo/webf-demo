/**
 * Auto-generated WebF module wrapper for "Point".
 *
 * This file is generated from a TypeScript interface that describes
 * the module API. It forwards calls to `webf.invokeModuleAsync` at runtime.
 */

import { webf } from '@openwebf/webf-enterprise-typings';
import type { InviteCode, NavigationParams, PointNavigationTarget, Result, ToastMessage, UniqueId } from './types';

export class WebFPoint {
  static isAvailable(): boolean {
    return typeof webf !== 'undefined' && typeof (webf as any).invokeModuleAsync === 'function';
  }

  static async showSuccessToast(toast: ToastMessage): Promise<void> {
    if (!this.isAvailable()) {
      throw new Error('WebF module "Point" is not available. Make sure it is registered via WebF.defineModule().');
    }
    return webf.invokeModuleAsync('Point', 'showSuccessToast', toast);
  }

  static async showWarningToast(toast: ToastMessage): Promise<void> {
    if (!this.isAvailable()) {
      throw new Error('WebF module "Point" is not available. Make sure it is registered via WebF.defineModule().');
    }
    return webf.invokeModuleAsync('Point', 'showWarningToast', toast);
  }

  static async showErrorToast(toast: ToastMessage): Promise<void> {
    if (!this.isAvailable()) {
      throw new Error('WebF module "Point" is not available. Make sure it is registered via WebF.defineModule().');
    }
    return webf.invokeModuleAsync('Point', 'showErrorToast', toast);
  }

  static async shareInviteCode(code: InviteCode): Promise<Result> {
    if (!this.isAvailable()) {
      throw new Error('WebF module "Point" is not available. Make sure it is registered via WebF.defineModule().');
    }
    return webf.invokeModuleAsync('Point', 'shareInviteCode', code);
  }

  static async generateUniqueId(): Promise<UniqueId> {
    if (!this.isAvailable()) {
      throw new Error('WebF module "Point" is not available. Make sure it is registered via WebF.defineModule().');
    }
    return webf.invokeModuleAsync('Point', 'generateUniqueId');
  }

  static async navigateTo(navigation: NavigationParams): Promise<void> {
    if (!this.isAvailable()) {
      throw new Error('WebF module "Point" is not available. Make sure it is registered via WebF.defineModule().');
    }
    return webf.invokeModuleAsync('Point', 'navigateTo', navigation);
  }

}

export type {
  InviteCode,NavigationParams,PointNavigationTarget,Result,ToastMessage,UniqueId
} from './types';
