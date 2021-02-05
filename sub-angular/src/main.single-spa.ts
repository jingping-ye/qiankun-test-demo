import { enableProdMode, NgZone } from '@angular/core';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router, NavigationStart } from '@angular/router';
import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';


import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';
import {globalDataReducer} from './app/reducer/app.reducer';

if (environment.production) {
  enableProdMode();
}

// 添加以下，启动应用
// 单应用下启动该方法
if (!(window as any).__POWERED_BY_QIANKUN__) {
  console.log("启动1")
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

// 微前端下启用该方法
const lifecycles = singleSpaAngular({
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
  },
  template: '<sub-angular-root />',
  Router,
  NavigationStart,
  NgZone,
  AnimationEngine,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
