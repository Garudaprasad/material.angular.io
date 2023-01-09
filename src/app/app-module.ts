import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { CanActivateSidenav } from "./pages/sidenav/sidenav-can-load-guard";

import { App } from "./app";
import { NavBarModule } from "./shared/navbar";
import { CookiePopupModule } from "./shared/cookie-popup/cookie-popup-module";
import { HttpLoaderFactory } from "./app.module.loader";
import { HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { SidenavResolver } from "./pages/sidenav/sidenav.resolver";
import { NavManager } from "./shared/nav-manager/nav-manager";

const MATERIAL_DOCS_ROUTES: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadChildren: () =>
      import("./pages/homepage").then((m) => m.HomepageModule),
  },
  {
    path: "conversions",
    pathMatch: "full",
    redirectTo: "/conversions/categories",
  },
  {
    path: "de_conversions",
    pathMatch: "full",
    redirectTo: "/de_conversions/categories",
  },
  {
    path: "404",
    loadChildren: () =>
      import("./pages/not-found").then((m) => m.NotFoundModule),
  },
  {
    path: ":section",
    canActivate: [CanActivateSidenav],
    resolve: {
      navItems: SidenavResolver,
    },
    loadChildren: () =>
      import("./pages/sidenav/sidenav.module").then(
        (m) => m.ComponentSidenavModule
      ),
  },
  { path: "**", redirectTo: "/404" },
];

const prefersReducedMotion =
  typeof matchMedia === "function"
    ? matchMedia("(prefers-reduced-motion)").matches
    : false;

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule.withConfig({
      disableAnimations: prefersReducedMotion,
    }),
    RouterModule.forRoot(MATERIAL_DOCS_ROUTES, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NavBarModule,
    CookiePopupModule,
  ],
  declarations: [App],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    NavManager,
    // { provide: ErrorHandler, useClass: AnalyticsErrorReportHandler },
  ],
  bootstrap: [App],
})
export class AppModule {}
