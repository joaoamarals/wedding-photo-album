import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { MyOverlayRef } from './overlay-ref';
import { OverlayComponent } from './overlay.component';

/**
 * https://github.com/mainawycliffe/ng-cdk-overlay-demo
 */

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<R = any, T = any>(
    content: Type<any>
  ): MyOverlayRef<R> {
    const configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['modal', 'is-active'],
      backdropClass: 'modal-background'
    });

    const overlayRef = this.overlay.create(configs);

    const myOverlayRef = new MyOverlayRef<R, T>(overlayRef, content);

    const injector = this.createInjector(myOverlayRef, this.injector);
    overlayRef.attach(new ComponentPortal(OverlayComponent, null, injector));

    return myOverlayRef;
  }

  createInjector(ref: MyOverlayRef, inj: Injector) {
    const injectorTokens = new WeakMap([[MyOverlayRef, ref]]);
    return new PortalInjector(inj, injectorTokens);
  }
}